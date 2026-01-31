# 💧 Dashboard Component Kılavuzu

## 📋 Genel Bakış

Dashboard ekranı, kullanıcının günlük su tüketimini takip etmesini sağlar. Animasyonlu su bardağı, hızlı ekleme butonları ve geçmiş kayıtlar içerir.

---

## 🎨 Component Yapısı

### 1. WaterGlass Component

Animasyonlu su bardağı - günlük hedefi gösterir.

#### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `currentAmount` | number | 0 | Mevcut su miktarı (litre) |
| `goalAmount` | number | 2.5 | Hedef su miktarı (litre) |
| `percentage` | number | 0 | Yüzde (0-100) |
| `height` | number | 300 | Bardak yüksekliği |
| `width` | number | 200 | Bardak genişliği |

#### Özellikler

- ✅ Spring animasyon ile su seviyesi
- ✅ Yüzdelik gösterge
- ✅ Miktar gösterimi (1.8L / 2.5L)
- ✅ Mavi renk (#2267f2)
- ✅ Responsive tasarım

#### Kullanım

```javascript
import WaterGlass from './src/components/water/WaterGlass';

<WaterGlass
  currentAmount={1.8}
  goalAmount={2.5}
  percentage={72}
  height={300}
  width={200}
/>
```

---

### 2. HistoryItem Component

Geçmiş su tüketim kaydı - tarih ve yüzdelik bar ile.

#### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `date` | string | - | Tarih (örn: "31 Ocak") |
| `percentage` | number | 0 | Tamamlanma yüzdesi (0-100) |
| `amount` | number | 0 | Tüketilen miktar (litre) |
| `goal` | number | 2.5 | Hedef miktar (litre) |
| `delay` | number | 0 | Animasyon gecikmesi (ms) |

#### Özellikler

- ✅ Animasyonlu progress bar
- ✅ Renk kodlaması:
  - 🟢 100%+ = Yeşil (başarı)
  - 🔵 75-99% = Mavi (iyi)
  - 🟡 50-74% = Sarı (orta)
  - 🔴 0-49% = Kırmızı (düşük)
- ✅ Tarih ve miktar gösterimi
- ✅ Staggered animasyon (sıralı)

#### Kullanım

```javascript
import HistoryItem from './src/components/water/HistoryItem';

<HistoryItem
  date="30 Ocak"
  percentage={95}
  amount={2.4}
  goal={2.5}
  delay={0}
/>
```

---

### 3. QuickAddButton Component

Hızlı su ekleme butonu.

#### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `amount` | number | - | Su miktarı (litre) |
| `label` | string | - | Buton etiketi |
| `onPress` | function | - | Tıklama fonksiyonu |
| `selected` | boolean | false | Seçili mi? |

#### Özellikler

- ✅ Yuvarlak buton tasarımı
- ✅ Seçili durumda renk değişimi
- ✅ Shadow efekti
- ✅ Responsive

#### Kullanım

```javascript
import QuickAddButton from './src/components/water/QuickAddButton';

<QuickAddButton
  amount={0.25}
  label="250ml"
  onPress={(amount) => handleAdd(amount)}
  selected={false}
/>
```

---

## 📱 Dashboard Screen

### Bölümler

#### 1. Header
- Sol: Profil ikonu
- Orta: "Su Takibi" başlığı
- Sağ: Ayarlar ikonu

#### 2. Water Glass
- Animasyonlu su bardağı
- Günlük hedef göstergesi
- Yüzde ve miktar

#### 3. Quick Add Buttons
- 250ml, 500ml, 1L, 1.5L
- Hızlı ekleme için
- Seçili durumda animasyon

#### 4. History Section
- Son 5 gün
- Tarih ve yüzde
- Animasyonlu progress bar
- "Tümünü Gör" butonu

---

## 🎨 Animasyonlar

### Water Glass Animasyon

```javascript
// Spring animasyon - yumuşak ve doğal
waterHeight.value = withSpring((percentage / 100) * height, {
  damping: 15,
  stiffness: 100,
});
```

**Özellikler:**
- Damping: 15 (hafif sallanma)
- Stiffness: 100 (orta sertlik)
- Süre: ~1 saniye

### History Item Animasyon

```javascript
// Staggered animasyon - sıralı görünüm
setTimeout(() => {
  progressWidth.value = withSpring(percentage, {
    damping: 15,
    stiffness: 100,
  });
}, delay);
```

**Özellikler:**
- Her item 100ms gecikmeli
- Yukarıdan aşağıya sıralı
- Smooth progress bar dolumu

---

## 🎨 Renk Sistemi

### Progress Bar Renkleri

```javascript
const getBarColor = () => {
  if (percentage >= 100) return Colors.success;   // #10b981 (Yeşil)
  if (percentage >= 75) return Colors.primary;    // #2267f2 (Mavi)
  if (percentage >= 50) return Colors.warning;    // #f59e0b (Sarı)
  return Colors.error;                            // #ef4444 (Kırmızı)
};
```

### Water Glass Renkleri

- **Su**: `#2267f2` (Primary blue)
- **Bardak çerçevesi**: `#2267f2` (Primary blue)
- **Arka plan**: `rgba(34, 103, 242, 0.1)` (Açık mavi)
- **Metin**: `#ffffff` (Beyaz)

---

## 📊 State Yönetimi

### Dashboard State

```javascript
const [currentAmount, setCurrentAmount] = useState(1.8);
const [goalAmount] = useState(2.5);
const [selectedAmount, setSelectedAmount] = useState(null);
```

### Redux Integration (Gelecek)

```javascript
// Redux'tan veri çekme
const currentAmount = useSelector(state => state.water.todayTotal);
const goalAmount = useSelector(state => state.user.profile.water_goal);
const historyData = useSelector(state => state.water.weeklyLogs);

// Su ekleme
const dispatch = useDispatch();
dispatch(logWaterIntake({ amount: 0.25, containerId: 'glass-250ml' }));
```

---

## 🔄 Veri Akışı

### Su Ekleme Akışı

```
1. Kullanıcı Quick Add butonuna tıklar
   ↓
2. handleQuickAdd(amount) çağrılır
   ↓
3. currentAmount güncellenir
   ↓
4. WaterGlass animasyonu tetiklenir
   ↓
5. Yeni yüzde hesaplanır
   ↓
6. Su seviyesi animate olur
```

### History Yükleme Akışı

```
1. Dashboard mount olur
   ↓
2. useEffect ile history data çekilir
   ↓
3. HistoryItem'lar render edilir
   ↓
4. Sıralı animasyon başlar (staggered)
   ↓
5. Progress bar'lar dolar
```

---

## 💡 Kullanım Örnekleri

### Basit Dashboard

```javascript
import DashboardScreen from './src/screens/main/DashboardScreen';

// Navigation'da
<Stack.Screen name="Dashboard" component={DashboardScreen} />
```

### Custom Water Glass

```javascript
<WaterGlass
  currentAmount={2.0}
  goalAmount={3.0}
  height={350}
  width={220}
/>
```

### History List

```javascript
const historyData = [
  { date: '30 Ocak', percentage: 95, amount: 2.4, goal: 2.5 },
  { date: '29 Ocak', percentage: 100, amount: 2.5, goal: 2.5 },
];

{historyData.map((item, index) => (
  <HistoryItem
    key={index}
    date={item.date}
    percentage={item.percentage}
    amount={item.amount}
    goal={item.goal}
    delay={index * 100}
  />
))}
```

---

## 🎯 Özelleştirme

### Water Glass Boyutu

```javascript
// Küçük bardak
<WaterGlass height={200} width={150} />

// Orta bardak (varsayılan)
<WaterGlass height={300} width={200} />

// Büyük bardak
<WaterGlass height={400} width={250} />
```

### Quick Add Miktarları

```javascript
const quickAddAmounts = [
  { amount: 0.125, label: '125ml' },  // Küçük
  { amount: 0.25, label: '250ml' },   // Orta
  { amount: 0.5, label: '500ml' },    // Büyük
  { amount: 1.0, label: '1L' },       // Çok büyük
];
```

### History Item Sayısı

```javascript
// Son 3 gün
const recentHistory = historyData.slice(0, 3);

// Son 7 gün
const weeklyHistory = historyData.slice(0, 7);

// Tümü
const allHistory = historyData;
```

---

## 📁 Dosya Yapısı

```
src/
├── components/
│   └── water/
│       ├── WaterGlass.js          # Animasyonlu su bardağı
│       ├── HistoryItem.js         # Geçmiş kayıt item'ı
│       └── QuickAddButton.js      # Hızlı ekleme butonu
├── screens/
│   └── main/
│       └── DashboardScreen.js     # Ana dashboard ekranı
└── constants/
    ├── colors.js                  # Renk sabitleri
    └── icons.js                   # İkon sabitleri
```

---

## ✅ Kontrol Listesi

- [x] react-native-reanimated kuruldu
- [x] WaterGlass component oluşturuldu
- [x] HistoryItem component oluşturuldu
- [x] QuickAddButton component oluşturuldu
- [x] DashboardScreen oluşturuldu
- [x] Animasyonlar çalışıyor
- [x] Renk sistemi entegre edildi
- [x] Responsive tasarım

---

## 🚀 Sonraki Adımlar

1. Redux entegrasyonu
2. Supabase'den veri çekme
3. Gerçek zamanlı güncelleme
4. Push notification entegrasyonu
5. Grafik ve istatistikler

---

## 💡 İpuçları

1. **Animasyon Performansı**: Reanimated 2 kullanıldığı için animasyonlar UI thread'de çalışır
2. **State Yönetimi**: Şu an local state, Redux'a geçilecek
3. **Renk Kodlaması**: Progress bar renkleri motivasyon için önemli
4. **Staggered Animasyon**: History item'lar sıralı animate olur, daha profesyonel görünüm

---

## 🎨 Tasarım Kararları

### Neden Spring Animasyon?
- Doğal ve yumuşak hareket
- Fizik tabanlı
- Kullanıcı dostu

### Neden Yuvarlak Butonlar?
- Modern tasarım
- Kolay tıklama
- Görsel çekicilik

### Neden Renk Kodlaması?
- Hızlı görsel feedback
- Motivasyon artışı
- Kullanıcı deneyimi

---

## 🚀 Artık Hazırsınız!

Dashboard ekranı tamamen hazır ve çalışır durumda! 💧
