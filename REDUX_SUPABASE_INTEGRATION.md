# 🔄 Redux ve Supabase Entegrasyon Kılavuzu

## 📋 Genel Bakış

Bu kılavuz, Dashboard ekranının Redux ve Supabase ile nasıl entegre edildiğini detaylı olarak açıklar.

---

## 🏗️ Mimari

```
User Action (Quick Add Button)
        ↓
Redux Action (logWaterIntake)
        ↓
Supabase API (INSERT water_logs)
        ↓
Redux State Update (todayTotal)
        ↓
Component Re-render (WaterGlass animation)
```

---

## 📦 Redux State Yapısı

### Water Slice State

```javascript
{
  water: {
    todayLogs: [],          // Bugünün su kayıtları
    todayTotal: 1.8,        // Bugün içilen toplam (L)
    history: [],            // Tüm geçmiş kayıtlar
    dailySummaries: [       // Günlük özetler
      {
        date: '2026-01-30',
        total: 2.4,
        percentage: 96,
        goal: 2.5,
        logs: [...]
      },
      // ...
    ],
    loading: false,
    error: null,
  }
}
```

### User Slice State

```javascript
{
  user: {
    profile: {
      water_goal: 2.5,      // Günlük hedef (L)
      thermos: 0.5,         // Termos boyutu (L)
      // ... diğer profil bilgileri
    },
    loading: false,
    error: null,
  }
}
```

---

## 🔧 Redux Actions

### 1. logWaterIntake

Su tüketimi kaydı ekler.

```javascript
import { logWaterIntake } from '../../redux/slices/waterSlice';

// Kullanım
dispatch(logWaterIntake({
  containerId: 'quick-add-250ml',
  volume: 0.25,
}));
```

**Parametreler:**
- `containerId` (string): Kap ID'si
- `volume` (number): Su miktarı (litre)
- `customVolume` (number, optional): Özel miktar

**Supabase İşlemi:**
```sql
INSERT INTO water_logs (user_id, container_id, volume, logged_at)
VALUES (userId, containerId, volume, NOW());
```

**State Güncellemesi:**
- `todayLogs` array'ine yeni kayıt eklenir
- `todayTotal` artırılır
- `loading` false olur

---

### 2. fetchTodayWaterLogs

Bugünün su kayıtlarını getirir.

```javascript
import { fetchTodayWaterLogs } from '../../redux/slices/waterSlice';

// Kullanım
dispatch(fetchTodayWaterLogs());
```

**Supabase İşlemi:**
```sql
SELECT * FROM water_logs
WHERE user_id = userId
  AND logged_at >= TODAY
  AND logged_at < TOMORROW
ORDER BY logged_at DESC;
```

**State Güncellemesi:**
- `todayLogs` güncellenir
- `todayTotal` hesaplanır (reduce ile)

---

### 3. fetchDailySummaries

Günlük özetleri getirir (son 7 gün).

```javascript
import { fetchDailySummaries } from '../../redux/slices/waterSlice';

// Kullanım
dispatch(fetchDailySummaries(7)); // Son 7 gün
```

**Supabase İşlemi:**
```sql
SELECT * FROM water_logs
WHERE user_id = userId
  AND logged_at >= (NOW() - INTERVAL '7 days')
  AND logged_at <= NOW()
ORDER BY logged_at DESC;
```

**İşleme:**
1. Kayıtlar tarihe göre gruplandırılır
2. Her gün için toplam hesaplanır
3. Yüzde hesaplanır (total / goal * 100)
4. Array'e dönüştürülür ve sıralanır

**State Güncellemesi:**
- `dailySummaries` güncellenir

---

### 4. deleteWaterLog

Su kaydını siler.

```javascript
import { deleteWaterLog } from '../../redux/slices/waterSlice';

// Kullanım
dispatch(deleteWaterLog(logId));
```

**Supabase İşlemi:**
```sql
DELETE FROM water_logs WHERE id = logId;
```

**State Güncellemesi:**
- Kayıt `todayLogs` ve `history`'den çıkarılır
- `todayTotal` azaltılır

---

## 🎯 Dashboard Screen Entegrasyonu

### 1. Redux Hooks

```javascript
import { useSelector, useDispatch } from 'react-redux';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  
  // State'den veri çekme
  const { todayTotal, dailySummaries, loading } = useSelector(
    (state) => state.water
  );
  const { profile } = useSelector((state) => state.user);
  const waterGoal = profile?.water_goal || 2.5;
  
  // ...
};
```

---

### 2. Veri Yükleme (useEffect)

```javascript
useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    await Promise.all([
      dispatch(fetchTodayWaterLogs()).unwrap(),
      dispatch(fetchDailySummaries(7)).unwrap(),
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
  }
};
```

**Açıklama:**
- Component mount olduğunda veri yüklenir
- `Promise.all` ile paralel yükleme
- `.unwrap()` ile promise'i açar (hata yakalama için)

---

### 3. Su Ekleme (Quick Add)

```javascript
const handleQuickAdd = async (amount) => {
  setSelectedAmount(amount);

  try {
    // Su kaydı ekle
    await dispatch(
      logWaterIntake({
        containerId: `quick-add-${amount * 1000}ml`,
        volume: amount,
      })
    ).unwrap();

    // Günlük özetleri yenile
    await dispatch(fetchDailySummaries(7)).unwrap();
  } catch (error) {
    console.error('Error adding water:', error);
  }

  // Animasyon için selection reset
  setTimeout(() => setSelectedAmount(null), 300);
};
```

**Akış:**
1. Buton seçilir (animasyon için)
2. Redux action dispatch edilir
3. Supabase'e kayıt eklenir
4. State güncellenir
5. Component re-render olur
6. WaterGlass animasyonu tetiklenir
7. Günlük özetler yenilenir

---

### 4. Refresh Control

```javascript
const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await loadData();
  setRefreshing(false);
};

// ScrollView'da
<ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
>
```

**Özellikler:**
- Pull-to-refresh
- Tüm verileri yeniler
- Loading indicator gösterir

---

## 📊 Veri Akışı Örnekleri

### Örnek 1: Uygulama Açılışı

```
1. DashboardScreen mount olur
   ↓
2. useEffect tetiklenir
   ↓
3. loadData() çağrılır
   ↓
4. fetchTodayWaterLogs dispatch edilir
   ↓
5. Supabase'den bugünün kayıtları çekilir
   ↓
6. todayLogs ve todayTotal güncellenir
   ↓
7. fetchDailySummaries dispatch edilir
   ↓
8. Supabase'den son 7 günün kayıtları çekilir
   ↓
9. Günlük özetler hesaplanır
   ↓
10. dailySummaries güncellenir
   ↓
11. Component re-render olur
   ↓
12. WaterGlass ve HistoryItem'lar gösterilir
```

---

### Örnek 2: Su Ekleme

```
1. Kullanıcı "250ml" butonuna tıklar
   ↓
2. handleQuickAdd(0.25) çağrılır
   ↓
3. selectedAmount = 0.25 (animasyon için)
   ↓
4. logWaterIntake dispatch edilir
   ↓
5. Supabase'e INSERT query gönderilir
   ↓
6. Yeni kayıt döner
   ↓
7. todayLogs'a eklenir
   ↓
8. todayTotal += 0.25
   ↓
9. Component re-render olur
   ↓
10. WaterGlass animasyonu başlar
   ↓
11. fetchDailySummaries dispatch edilir
   ↓
12. Günlük özetler güncellenir
   ↓
13. 300ms sonra selectedAmount = null
```

---

## 🎨 State Selectors

### Basit Selector

```javascript
const todayTotal = useSelector((state) => state.water.todayTotal);
```

### Hesaplanmış Selector

```javascript
const percentage = useSelector((state) => {
  const { todayTotal } = state.water;
  const { water_goal } = state.user.profile;
  return (todayTotal / water_goal) * 100;
});
```

### Memoized Selector (Reselect ile)

```javascript
import { createSelector } from '@reduxjs/toolkit';

const selectWaterPercentage = createSelector(
  [(state) => state.water.todayTotal, (state) => state.user.profile.water_goal],
  (todayTotal, waterGoal) => (todayTotal / waterGoal) * 100
);

// Kullanım
const percentage = useSelector(selectWaterPercentage);
```

---

## 🔄 Gerçek Zamanlı Güncelleme (Opsiyonel)

### Supabase Realtime

```javascript
useEffect(() => {
  // Realtime subscription
  const subscription = supabase
    .channel('water_logs_changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'water_logs',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        console.log('New water log:', payload.new);
        // Verileri yenile
        dispatch(fetchTodayWaterLogs());
      }
    )
    .subscribe();

  // Cleanup
  return () => {
    subscription.unsubscribe();
  };
}, [userId]);
```

---

## 🐛 Hata Yönetimi

### Try-Catch ile

```javascript
const handleQuickAdd = async (amount) => {
  try {
    await dispatch(logWaterIntake({ volume: amount })).unwrap();
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Hata', 'Su eklenirken bir hata oluştu');
  }
};
```

### Redux Error State ile

```javascript
const { error } = useSelector((state) => state.water);

useEffect(() => {
  if (error) {
    Alert.alert('Hata', error);
    dispatch(clearWaterError());
  }
}, [error]);
```

---

## 📱 Loading States

### Global Loading

```javascript
const { loading } = useSelector((state) => state.water);

{loading && <ActivityIndicator size="large" color={Colors.primary} />}
```

### Action-Specific Loading

```javascript
const [addingWater, setAddingWater] = useState(false);

const handleQuickAdd = async (amount) => {
  setAddingWater(true);
  try {
    await dispatch(logWaterIntake({ volume: amount })).unwrap();
  } finally {
    setAddingWater(false);
  }
};
```

---

## 🎯 Best Practices

### 1. Unwrap Promises

```javascript
// ✅ İyi
await dispatch(fetchTodayWaterLogs()).unwrap();

// ❌ Kötü
await dispatch(fetchTodayWaterLogs());
```

### 2. Paralel Yükleme

```javascript
// ✅ İyi - Paralel
await Promise.all([
  dispatch(fetchTodayWaterLogs()).unwrap(),
  dispatch(fetchDailySummaries(7)).unwrap(),
]);

// ❌ Kötü - Sıralı
await dispatch(fetchTodayWaterLogs()).unwrap();
await dispatch(fetchDailySummaries(7)).unwrap();
```

### 3. Error Handling

```javascript
// ✅ İyi
try {
  await dispatch(logWaterIntake({ volume })).unwrap();
} catch (error) {
  console.error('Error:', error);
  Alert.alert('Hata', error.message);
}

// ❌ Kötü - Hata yakalanmıyor
dispatch(logWaterIntake({ volume }));
```

### 4. Cleanup

```javascript
// ✅ İyi
useEffect(() => {
  loadData();
  
  return () => {
    // Cleanup
    dispatch(clearWaterError());
  };
}, []);
```

---

## 🚀 Performans Optimizasyonu

### 1. Memoization

```javascript
import { useMemo } from 'react';

const percentage = useMemo(
  () => (todayTotal / waterGoal) * 100,
  [todayTotal, waterGoal]
);
```

### 2. Selective Re-rendering

```javascript
// Sadece gerekli state'i seç
const todayTotal = useSelector((state) => state.water.todayTotal);

// Tüm state'i seçme
const water = useSelector((state) => state.water); // ❌
```

### 3. Debouncing

```javascript
import { debounce } from 'lodash';

const debouncedRefresh = useMemo(
  () => debounce(() => dispatch(fetchTodayWaterLogs()), 1000),
  []
);
```

---

## 📚 Özet

### Redux Actions
- ✅ `logWaterIntake` - Su ekle
- ✅ `fetchTodayWaterLogs` - Bugünün kayıtları
- ✅ `fetchDailySummaries` - Günlük özetler
- ✅ `deleteWaterLog` - Kayıt sil

### Supabase Queries
- ✅ INSERT - Su kaydı ekle
- ✅ SELECT - Kayıtları getir
- ✅ DELETE - Kayıt sil

### State Management
- ✅ useSelector - State'den veri çek
- ✅ useDispatch - Action dispatch et
- ✅ unwrap() - Promise'i aç

### Best Practices
- ✅ Error handling
- ✅ Loading states
- ✅ Paralel yükleme
- ✅ Memoization

---

## 🎉 Artık Hazırsınız!

Redux ve Supabase entegrasyonu tamamlandı! Dashboard ekranı artık gerçek verilerle çalışıyor! 💧
