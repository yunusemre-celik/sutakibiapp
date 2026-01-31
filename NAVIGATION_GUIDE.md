# 🧭 Navigation ve Ekranlar Kılavuzu

## 📋 Genel Bakış

Bu kılavuz, uygulamanın tüm navigation yapısını ve ekranlarını detaylı olarak açıklar.

---

## 🏗️ Navigation Yapısı

```
App
├── AuthNavigator (Giriş yapmamış kullanıcılar)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   └── RegisterScreen
│
└── MainTabNavigator (Giriş yapmış kullanıcılar)
    ├── Dashboard Tab
    ├── History Tab
    ├── Profile Tab
    └── Settings Tab
```

---

## 📱 Ekranlar

### 1. WelcomeScreen

**Dosya:** `src/screens/auth/WelcomeScreen.js`

**Amaç:** İlk açılış ekranı - uygulamayı tanıtır

**Özellikler:**
- ✅ Underwater background (blur: 5, overlay: 0.2)
- ✅ Uygulama logosu ve başlığı
- ✅ 3 özellik kartı (Hedef, İlerleme, Hatırlatıcılar)
- ✅ "Başla" butonu → Register ekranına
- ✅ "Giriş Yap" butonu → Login ekranına

**Kullanılan İkonlar:**
- `HAND` - Logo (64px)
- `TARGET` - Hedef özelliği (32px)
- `ACTIVITY` - İlerleme özelliği (32px)
- `BELL` - Hatırlatıcı özelliği (32px)
- `ARROW_RIGHT_CIRCLE` - Başla butonu (20px)

**Tasarım:**
```
┌─────────────────────────┐
│         👋              │
│     Su Takibi           │
│  Günlük su tüketimini   │
│    kolayca takip et     │
│                         │
│  🎯      📊      🔔     │
│ Hedef  İlerleme Hatırlatıcı│
│                         │
│  [    Başla    →   ]   │
│  [   Giriş Yap     ]   │
└─────────────────────────┘
```

---

### 2. LoginScreen

**Dosya:** `src/screens/auth/LoginScreen.js`

**Amaç:** Kullanıcı girişi

**Özellikler:**
- ✅ Underwater background (blur: 10, overlay: 0.3)
- ✅ Email input (validation)
- ✅ Password input (toggle visibility)
- ✅ Redux entegrasyonu (`signIn` action)
- ✅ Loading state
- ✅ Error handling
- ✅ "Şifremi Unuttum" linki
- ✅ "Kayıt Ol" linki

**Kullanılan İkonlar:**
- `LOG_IN` - Header ikonu (64px)
- `MAIL` - Email input (20px)
- `LOCK` - Password input (20px)
- `EYE` / `EYE_OFF` - Password toggle (20px)

**Validation:**
- Email ve password boş olamaz
- Supabase auth hatalarını gösterir

**Redux Actions:**
```javascript
dispatch(signIn({ email, password }))
```

---

### 3. RegisterScreen

**Dosya:** `src/screens/auth/RegisterScreen.js`

**Amaç:** Yeni kullanıcı kaydı

**Özellikler:**
- ✅ Underwater background (blur: 15, overlay: 0.4)
- ✅ Email input (email validation)
- ✅ Password input (min 6 karakter)
- ✅ Confirm password input (eşleşme kontrolü)
- ✅ Password visibility toggle
- ✅ Redux entegrasyonu (`signUp` action)
- ✅ Loading state
- ✅ Error handling
- ✅ Kullanım şartları metni
- ✅ "Giriş Yap" linki

**Kullanılan İkonlar:**
- `USER_PLUS` - Header ikonu (64px)
- `MAIL` - Email input (20px)
- `LOCK` - Password input (20px)
- `KEY` - Confirm password input (20px)
- `EYE` / `EYE_OFF` - Password toggle (20px)

**Validation:**
- Tüm alanlar dolu olmalı
- Email formatı geçerli olmalı
- Password min 6 karakter
- Password ve confirm password eşleşmeli

**Redux Actions:**
```javascript
dispatch(signUp({ email, password }))
```

---

### 4. DashboardScreen

**Dosya:** `src/screens/main/DashboardScreen.js`

**Amaç:** Ana ekran - günlük su takibi

**Özellikler:**
- ✅ Header (Profile, Title, Settings)
- ✅ Animasyonlu su bardağı (WaterGlass)
- ✅ Hızlı ekleme butonları (250ml, 500ml, 1L, 1.5L)
- ✅ Geçmiş kayıtlar (son 5 gün)
- ✅ Pull-to-refresh
- ✅ Loading states
- ✅ Empty states
- ✅ Redux entegrasyonu
- ✅ Supabase veri çekme

**Bölümler:**
1. **Header**: Profil ve Ayarlar butonları
2. **Water Glass**: Günlük hedef göstergesi
3. **Quick Add**: Hızlı su ekleme
4. **History**: Geçmiş kayıtlar

**Redux Actions:**
```javascript
dispatch(fetchTodayWaterLogs())
dispatch(fetchDailySummaries(7))
dispatch(logWaterIntake({ containerId, volume }))
```

---

### 5. SettingsScreen

**Dosya:** `src/screens/main/SettingsScreen.js`

**Amaç:** Uygulama ayarları

**Özellikler:**
- ✅ Header (Back button, Title)
- ✅ Profil ayarları bölümü
- ✅ Bildirim ayarları (Switch)
- ✅ Uygulama bilgileri
- ✅ Çıkış yap butonu
- ✅ Redux entegrasyonu

**Bölümler:**

#### Profil
- Kişisel Bilgiler → PersonalInfo ekranı
- Fiziksel Bilgiler → PhysicalInfo ekranı
- Su Hedefi → GoalSetting ekranı

#### Bildirimler
- Bildirimler (Switch)
- Ses (Switch)

#### Uygulama
- Hakkında
- Gizlilik Politikası
- Kullanım Şartları
- Yardım & Destek

#### Danger Zone
- Çıkış Yap (Confirmation alert)

**Kullanılan İkonlar:**
- `ARROW_LEFT` - Back button (24px)
- `USER` - Kişisel bilgiler (20px)
- `ACTIVITY` - Fiziksel bilgiler (20px)
- `TARGET` - Su hedefi (20px)
- `BELL` - Bildirimler (20px)
- `VOLUME` - Ses (20px)
- `INFO` - Hakkında (20px)
- `SHIELD` - Gizlilik (20px)
- `FILE_TEXT` - Kullanım şartları (20px)
- `HELP_CIRCLE` - Yardım (20px)
- `LOG_OUT` - Çıkış (20px)

---

## 🧭 Navigation Navigators

### 1. AuthNavigator

**Dosya:** `src/navigation/AuthNavigator.js`

**Ekranlar:**
- Welcome
- Login
- Register

**Özellikler:**
- Stack navigation
- Header gizli
- Slide animasyonu

```javascript
<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Welcome" component={WelcomeScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Register" component={RegisterScreen} />
</Stack.Navigator>
```

---

### 2. MainTabNavigator

**Dosya:** `src/navigation/MainTabNavigator.js`

**Tabs:**
1. **Dashboard** - Ana Sayfa (home icon)
2. **History** - Geçmiş (clock icon)
3. **Profile** - Profil (user icon)
4. **Settings** - Ayarlar (settings icon)

**Özellikler:**
- Bottom tab navigation
- Active color: `#2267f2` (primary)
- Inactive color: `#999` (gray)
- Custom tab bar style
- Icon size: 24px

**Tasarım:**
```
┌─────────────────────────┐
│                         │
│     Screen Content      │
│                         │
├─────────────────────────┤
│  🏠    🕐    👤    ⚙️  │
│ Ana   Geçmiş Profil Ayarlar│
└─────────────────────────┘
```

---

### 3. AppNavigator

**Dosya:** `src/navigation/AppNavigator.js`

**Amaç:** Ana navigation - auth durumuna göre ekran gösterir

**Akış:**
```
App Start
    ↓
Check Session (Redux)
    ↓
Loading Screen
    ↓
┌─────────────────┐
│ isAuthenticated?│
└─────────────────┘
    ↓           ↓
   NO          YES
    ↓           ↓
AuthNavigator  MainTabNavigator
```

**Redux Entegrasyonu:**
```javascript
useEffect(() => {
  dispatch(checkSession());
}, []);

useEffect(() => {
  if (isAuthenticated) {
    dispatch(fetchUserProfile());
  }
}, [isAuthenticated]);
```

---

## 🎨 Tema ve Tasarım

### Underwater Background

Tüm auth ekranlarında kullanılır:

| Ekran | Blur | Overlay | Neden |
|-------|------|---------|-------|
| Welcome | 5 | 0.2 | Arka plan görünür olmalı |
| Login | 10 | 0.3 | Form net görünmeli |
| Register | 15 | 0.4 | Çok form var, net olmalı |

### Renk Paleti

```javascript
Colors.primary = '#2267f2'      // Ana renk (mavi)
Colors.white = '#ffffff'        // Beyaz
Colors.gray400 = '#9ca3af'      // Placeholder
Colors.gray500 = '#6b7280'      // İkonlar
Colors.error = '#ef4444'        // Hata
Colors.success = '#10b981'      // Başarı
```

### Typography

```javascript
// Başlıklar
fontSize: 32
fontWeight: 'bold'
color: Colors.white
textShadow: rgba(0,0,0,0.3)

// Alt başlıklar
fontSize: 16
color: Colors.white
opacity: 0.9

// Butonlar
fontSize: 18
fontWeight: '600'
color: Colors.white
```

---

## 🔄 Navigation Akışları

### İlk Açılış Akışı

```
App Start
    ↓
WelcomeScreen
    ↓
[Başla] → RegisterScreen
    ↓
Register Success
    ↓
Alert → LoginScreen
    ↓
Login Success
    ↓
DashboardScreen
```

### Login Akışı

```
WelcomeScreen
    ↓
[Giriş Yap] → LoginScreen
    ↓
Enter email & password
    ↓
[Giriş Yap] → dispatch(signIn)
    ↓
Supabase Auth
    ↓
Success → DashboardScreen
```

### Settings Akışı

```
DashboardScreen
    ↓
[Settings Icon] → SettingsScreen
    ↓
[Kişisel Bilgiler] → PersonalInfoScreen (TODO)
[Fiziksel Bilgiler] → PhysicalInfoScreen (TODO)
[Su Hedefi] → GoalSettingScreen (TODO)
[Çıkış Yap] → Confirmation → WelcomeScreen
```

---

## 📦 Kullanılan Kütüphaneler

```json
{
  "@react-navigation/native": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "react-native-screens": "^3.x",
  "react-native-safe-area-context": "^4.x"
}
```

---

## 🎯 Sonraki Adımlar

### Tamamlandı ✅
- [x] WelcomeScreen
- [x] LoginScreen
- [x] RegisterScreen
- [x] DashboardScreen
- [x] SettingsScreen
- [x] AuthNavigator
- [x] MainTabNavigator
- [x] AppNavigator

### Yapılacaklar ⏳
- [ ] HistoryScreen
- [ ] ProfileScreen
- [ ] PersonalInfoScreen (Onboarding)
- [ ] PhysicalInfoScreen (Onboarding)
- [ ] GoalSettingScreen (Onboarding)
- [ ] OnboardingNavigator

---

## 💡 Best Practices

### 1. Navigation

```javascript
// ✅ İyi - navigation prop kullan
navigation.navigate('Login')

// ❌ Kötü - hard-coded navigation
// Kullanma
```

### 2. Redux Integration

```javascript
// ✅ İyi - useSelector ve useDispatch
const { isAuthenticated } = useSelector((state) => state.auth);
const dispatch = useDispatch();

// ❌ Kötü - connect() HOC
// Kullanma (eski yöntem)
```

### 3. Error Handling

```javascript
// ✅ İyi - try-catch ve Alert
try {
  await dispatch(signIn({ email, password })).unwrap();
} catch (error) {
  Alert.alert('Hata', error.message);
}
```

### 4. Loading States

```javascript
// ✅ İyi - Redux loading state
const { loading } = useSelector((state) => state.auth);

{loading && <ActivityIndicator />}
```

---

## 🚀 Artık Hazırsınız!

Tüm navigation yapısı ve temel ekranlar hazır! 🧭
