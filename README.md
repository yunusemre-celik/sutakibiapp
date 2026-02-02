# 💧 Su Takibi Uygulaması

Kullanıcıların günlük su tüketimini takip etmelerine, hedefler belirlemelerine ve bildirimler almalarına olanak sağlayan cross-platform mobil uygulama.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknoloji Stack](#️-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Proje Yapısı](#-proje-yapısı)
- [Ekranlar ve Navigation](#-ekranlar-ve-navigation)
- [Redux State Management](#-redux-state-management)
- [Supabase Backend](#-supabase-backend)
- [Component'ler](#️-componentler)
- [Tasarım Sistemi](#-tasarım-sistemi)
- [Kullanım](#-kullanım)
- [Geliştirme](#-geliştirme)

---

## 🚀 Özellikler

### ✅ Tamamlanan Özellikler

- **Kullanıcı Kimlik Doğrulama**
  - Email/Password ile kayıt ve giriş
  - Supabase Authentication entegrasyonu
  - Mock mode (development için)
  - Session yönetimi

- **Dashboard**
  - Animasyonlu su bardağı göstergesi
  - Günlük hedef takibi
  - Hızlı su ekleme butonları (250ml, 500ml, 1L, 1.5L)
  - Geçmiş kayıtlar (son 5 gün)
  - Pull-to-refresh
  - Renk kodlamalı ilerleme barları

- **Ayarlar**
  - Profil yönetimi
  - Bildirim ayarları
  - Su hedefi düzenleme
  - Çıkış yapma

- **Navigation**
  - Bottom Tab Navigation (4 tab)
  - Stack Navigation (Auth flow)
  - Conditional navigation (Auth check)

- **Tasarım**
  - Underwater tema (su altı arka planı)
  - Blur efektleri
  - Smooth animasyonlar (React Native Reanimated)
  - Responsive layout
  - Modern UI/UX

### ⏳ Gelecek Özellikler

- Onboarding ekranları (Kişisel bilgiler, Fiziksel bilgiler, Hedef belirleme)
- Geçmiş ekranı (Detaylı istatistikler)
- Profil ekranı
- Push notifications (Su içme hatırlatıcıları)
- Grafik ve istatistikler
- Sosyal özellikler

---

## 🛠️ Teknoloji Stack

### Frontend
- **Framework**: React Native (Expo SDK 52)
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Animations**: react-native-reanimated
- **UI Effects**: @react-native-community/blur
- **Icons**: @expo/vector-icons (Feather, FontAwesome, MaterialCommunityIcons)

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime (planned)

### Development
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm
- **Version Control**: Git
- **Environment Variables**: babel-plugin-inline-dotenv

### Design System
- **Primary Color**: `#2267f2` (Blue - Water theme)
- **Typography**: System fonts
- **Icons**: 32+ custom icons
- **Components**: Reusable, modular design

---

## 📦 Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- Expo Go app (iOS/Android)
- Supabase account (opsiyonel)

### Adım 1: Projeyi Klonlayın

```bash
git clone <repository-url>
cd sutakibiapp
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
```

### Adım 3: Environment Variables (Opsiyonel)

Supabase kullanmak için `.env` dosyası oluşturun:

```bash
# .env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Not**: Supabase olmadan da çalışır (mock data kullanır)

### Adım 4: Uygulamayı Başlatın

```bash
npm start
```

veya cache temizleyerek:

```bash
npm start -- --clear
```

### Adım 5: Expo Go ile Test Edin

- iOS: App Store'dan Expo Go indirin
- Android: Play Store'dan Expo Go indirin
- QR kodu tarayın

---

## 📁 Proje Yapısı

```
sutakibiapp/
├── assets/                      # Görseller ve medya dosyaları
│   ├── icon.png
│   ├── splash-icon.png
│   └── underwater-bg.png       # Arka plan görseli
│
├── src/
│   ├── components/             # Reusable component'ler
│   │   ├── common/
│   │   │   ├── Icon.js        # Icon wrapper component
│   │   │   └── UnderwaterBackground.js  # Arka plan component
│   │   └── water/
│   │       ├── WaterGlass.js   # Animasyonlu su bardağı
│   │       ├── HistoryItem.js  # Geçmiş kayıt item'ı
│   │       └── QuickAddButton.js  # Hızlı ekleme butonu
│   │
│   ├── constants/              # Sabitler
│   │   ├── colors.js          # Renk paleti
│   │   ├── icons.js           # İkon tanımları
│   │   ├── waterContainers.js # Kap boyutları
│   │   └── index.js
│   │
│   ├── navigation/             # Navigation yapısı
│   │   ├── AppNavigator.js    # Ana navigator
│   │   ├── AuthNavigator.js   # Auth stack
│   │   └── MainTabNavigator.js # Tab navigator
│   │
│   ├── redux/                  # State management
│   │   ├── slices/
│   │   │   ├── authSlice.js   # Auth state
│   │   │   ├── userSlice.js   # User profile state
│   │   │   └── waterSlice.js  # Water tracking state
│   │   └── store.js           # Redux store
│   │
│   ├── screens/                # Ekranlar
│   │   ├── auth/
│   │   │   ├── WelcomeScreen.js
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   └── main/
│   │       ├── DashboardScreen.js
│   │       └── SettingsScreen.js
│   │
│   ├── services/               # External services
│   │   ├── supabase.js        # Supabase client
│   │   └── notificationService.js
│   │
│   └── utils/                  # Utility fonksiyonlar
│       └── helpers.js
│
├── .env                        # Environment variables (gitignore)
├── .env.example               # Environment template
├── .gitignore
├── App.js                     # Ana uygulama dosyası
├── app.json                   # Expo configuration
├── babel.config.js            # Babel configuration
├── index.js                   # Entry point
├── package.json
└── README.md
```

---

## 🖼️ Ekranlar ve Navigation

### Navigation Yapısı

```
App
├── AuthNavigator (Giriş yapmamış)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   └── RegisterScreen
│
└── MainTabNavigator (Giriş yapmış)
    ├── Dashboard Tab
    ├── History Tab (TODO)
    ├── Profile Tab (TODO)
    └── Settings Tab
```

### Ekran Detayları

#### 1. WelcomeScreen
- **Amaç**: İlk açılış ekranı
- **Özellikler**:
  - Underwater background
  - Uygulama tanıtımı
  - 3 özellik kartı (Hedef, İlerleme, Hatırlatıcılar)
  - "Başla" ve "Giriş Yap" butonları

#### 2. LoginScreen
- **Amaç**: Kullanıcı girişi
- **Özellikler**:
  - Email/Password inputları
  - Password visibility toggle
  - Form validation
  - Redux entegrasyonu
  - Loading states

#### 3. RegisterScreen
- **Amaç**: Yeni kullanıcı kaydı
- **Özellikler**:
  - Email, Password, Confirm Password
  - Email format validation
  - Password strength check
  - Kullanım şartları

#### 4. DashboardScreen
- **Amaç**: Ana ekran - günlük su takibi
- **Bölümler**:
  - **Header**: Profil ve Ayarlar butonları
  - **Water Glass**: Animasyonlu su bardağı (Spring animation)
  - **Quick Add**: Hızlı ekleme butonları (250ml, 500ml, 1L, 1.5L)
  - **History**: Geçmiş kayıtlar (son 5 gün, renk kodlamalı)
- **Özellikler**:
  - Pull-to-refresh
  - Loading/Empty states
  - Redux + Supabase entegrasyonu

#### 5. SettingsScreen
- **Amaç**: Uygulama ayarları
- **Bölümler**:
  - **Profil**: Kişisel bilgiler, Fiziksel bilgiler, Su hedefi
  - **Bildirimler**: Bildirim ve ses ayarları
  - **Uygulama**: Hakkında, Gizlilik, Yardım
  - **Danger Zone**: Çıkış yap

---

## 🔄 Redux State Management

### Store Yapısı

```javascript
{
  auth: {
    user: { id, email, ... },
    session: { ... },
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },
  
  user: {
    profile: {
      name, birth_date, gender,
      weight, height, activity_level,
      water_goal, thermos,
      onboarding_completed
    },
    loading: boolean,
    error: string | null
  },
  
  water: {
    todayLogs: [...],
    todayTotal: number,
    dailySummaries: [...],
    loading: boolean,
    error: string | null
  }
}
```

### Redux Actions

#### Auth Actions
```javascript
// Kayıt ol
dispatch(signUp({ email, password }))

// Giriş yap
dispatch(signIn({ email, password }))

// Çıkış yap
dispatch(signOut())

// Session kontrolü
dispatch(checkSession())
```

#### User Actions
```javascript
// Profil kaydet
dispatch(saveUserProfile(profileData))

// Profil getir
dispatch(fetchUserProfile())

// Su hedefi güncelle
dispatch(updateWaterGoal(2.5))
```

#### Water Actions
```javascript
// Su ekle
dispatch(logWaterIntake({ 
  containerId: 'quick-add-250ml',
  volume: 0.25 
}))

// Bugünün kayıtları
dispatch(fetchTodayWaterLogs())

// Günlük özetler (son 7 gün)
dispatch(fetchDailySummaries(7))

// Kayıt sil
dispatch(deleteWaterLog(logId))
```

### Mock Data Desteği

Supabase olmadan da çalışır:

```javascript
// Mock kullanıcı
{
  id: 'mock-user-id',
  email: 'demo@sutakibi.com',
  name: 'Demo User'
}

// Mock profil
{
  water_goal: 2.5,
  weight: 70,
  height: 175,
  onboarding_completed: true
}
```

---

## 🗄️ Supabase Backend

### Database Şeması

#### 1. user_profiles

```sql
CREATE TABLE user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  birth_date DATE,
  gender TEXT,
  location TEXT,
  weight DECIMAL,
  height DECIMAL,
  activity_level TEXT,
  water_goal DECIMAL DEFAULT 2.5,
  thermos DECIMAL DEFAULT 0.5,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);
```

#### 2. water_logs

```sql
CREATE TABLE water_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  container_id TEXT,
  volume DECIMAL NOT NULL,
  logged_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_logs ENABLE ROW LEVEL SECURITY;

-- user_profiles policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- water_logs policies
CREATE POLICY "Users can view own logs"
  ON water_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs"
  ON water_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs"
  ON water_logs FOR DELETE
  USING (auth.uid() = user_id);
```

### Supabase Kurulumu

1. **Supabase Dashboard**: https://app.supabase.com
2. **Yeni proje oluştur**
3. **SQL Editor'da tabloları oluştur** (yukarıdaki SQL'leri çalıştır)
4. **API Keys'i kopyala** (Settings > API)
5. **`.env` dosyasına ekle**:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
6. **Uygulamayı yeniden başlat**: `npm start -- --clear`

---

## 🧩 Component'ler

### Common Components

#### Icon Component
```javascript
import Icon from './src/components/common/Icon';

<Icon 
  name="home" 
  family="Feather" 
  size={24} 
  color="#2267f2" 
/>
```

**Özellikler**:
- 32+ önceden tanımlı ikon
- 3 ikon ailesi (Feather, FontAwesome, MaterialCommunityIcons)
- Özelleştirilebilir boyut ve renk
- onPress desteği

#### UnderwaterBackground Component
```javascript
import UnderwaterBackground from './src/components/common/UnderwaterBackground';

<UnderwaterBackground 
  blurAmount={10} 
  overlayOpacity={0.3}
>
  {/* Content */}
</UnderwaterBackground>
```

**Özellikler**:
- Underwater tema arka planı
- Blur efekti (0-100)
- Overlay opacity (0-1)
- Özelleştirilebilir

### Water Components

#### WaterGlass Component
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

**Özellikler**:
- Spring animasyon
- Yüzde göstergesi
- Miktar gösterimi
- Responsive

#### HistoryItem Component
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

**Özellikler**:
- Animasyonlu progress bar
- Renk kodlaması (🟢🔵🟡🔴)
- Staggered animasyon

#### QuickAddButton Component
```javascript
import QuickAddButton from './src/components/water/QuickAddButton';

<QuickAddButton
  amount={0.25}
  label="250ml"
  onPress={(amount) => handleAdd(amount)}
  selected={false}
/>
```

**Özellikler**:
- Yuvarlak buton tasarımı
- Seçili durumda renk değişimi
- Shadow efekti

---

## 🎨 Tasarım Sistemi

### Renk Paleti

```javascript
// Primary Colors
Colors.primary = '#2267f2'        // Ana mavi
Colors.primaryDark = '#1a52c2'    // Koyu mavi
Colors.primaryLight = '#5a8ff7'   // Açık mavi

// Neutral Colors
Colors.white = '#ffffff'
Colors.black = '#000000'
Colors.background = '#f5f5f5'
Colors.border = '#e5e5e5'

// Gray Scale
Colors.gray100 = '#f7fafc'
Colors.gray200 = '#edf2f7'
Colors.gray300 = '#e2e8f0'
Colors.gray400 = '#cbd5e0'
Colors.gray500 = '#a0aec0'

// Text Colors
Colors.textPrimary = '#1a202c'
Colors.textSecondary = '#718096'

// Semantic Colors
Colors.success = '#10b981'        // Yeşil
Colors.error = '#ef4444'          // Kırmızı
Colors.warning = '#f59e0b'        // Sarı
Colors.info = '#3b82f6'          // Mavi
```

### İkonlar

```javascript
// Icon Sizes
IconSize.SMALL = 16
IconSize.MEDIUM = 20
IconSize.LARGE = 24
IconSize.XLARGE = 32
IconSize.XXLARGE = 48
IconSize.XXXLARGE = 64

// Icon Families
IconFamily.FEATHER = 'Feather'
IconFamily.FONT_AWESOME = 'FontAwesome'
IconFamily.MATERIAL_COMMUNITY = 'MaterialCommunityIcons'

// Örnek İkonlar
Icons.HOME = { name: 'home', family: 'Feather' }
Icons.USER = { name: 'user', family: 'Feather' }
Icons.SETTINGS = { name: 'settings', family: 'Feather' }
Icons.BELL = { name: 'bell', family: 'Feather' }
Icons.TARGET = { name: 'target', family: 'Feather' }
// ... 27 more icons
```

### Typography

```javascript
// Headings
fontSize: 32, fontWeight: 'bold'    // H1
fontSize: 24, fontWeight: 'bold'    // H2
fontSize: 20, fontWeight: 'bold'    // H3
fontSize: 18, fontWeight: '600'     // H4

// Body
fontSize: 16, fontWeight: 'normal'  // Body
fontSize: 14, fontWeight: 'normal'  // Small
fontSize: 12, fontWeight: 'normal'  // Caption

// Buttons
fontSize: 18, fontWeight: '600'     // Primary
fontSize: 16, fontWeight: '600'     // Secondary
```

### Spacing

```javascript
// Padding/Margin
spacing.xs = 4
spacing.sm = 8
spacing.md = 16
spacing.lg = 24
spacing.xl = 32
spacing.xxl = 48
```

---

## 💻 Kullanım

### Development Mode (Mock Data)

```bash
# Uygulamayı başlat
npm start

# Herhangi bir email/password ile giriş yap
Email: demo@sutakibi.com
Password: (herhangi bir şey)

# Dashboard'da mock data göreceksiniz
```

### Production Mode (Supabase)

```bash
# .env dosyasını yapılandır
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key

# Database'i kur (SQL komutlarını çalıştır)

# Uygulamayı yeniden başlat
npm start -- --clear

# Gerçek kayıt ol ve giriş yap
```

### Veri Akışı Örnekleri

#### Su Ekleme
```
1. Kullanıcı "250ml" butonuna tıklar
2. handleQuickAdd(0.25) çağrılır
3. dispatch(logWaterIntake({ volume: 0.25 }))
4. Supabase'e INSERT (veya mock data)
5. Redux state güncellenir
6. WaterGlass animasyonu tetiklenir
7. Yeni yüzde hesaplanır
```

#### Giriş Yapma
```
1. Kullanıcı email/password girer
2. dispatch(signIn({ email, password }))
3. Supabase Auth (veya mock auth)
4. Session oluşturulur
5. dispatch(fetchUserProfile())
6. Navigation → DashboardScreen
```

---

## 🔧 Geliştirme

### Yeni Ekran Ekleme

1. **Screen dosyası oluştur**: `src/screens/main/NewScreen.js`
2. **Navigator'a ekle**: `src/navigation/MainTabNavigator.js`
3. **Redux slice oluştur** (gerekirse): `src/redux/slices/newSlice.js`
4. **Component'leri kullan**: `src/components/...`

### Yeni Component Ekleme

1. **Component dosyası**: `src/components/category/NewComponent.js`
2. **Props tanımla**: PropTypes veya JSDoc
3. **Styles ekle**: StyleSheet.create()
4. **Export et**: `export default NewComponent`

### Redux Slice Ekleme

1. **Slice dosyası**: `src/redux/slices/newSlice.js`
2. **Initial state tanımla**
3. **Async thunks oluştur** (Supabase queries)
4. **Reducers ekle**
5. **Store'a ekle**: `src/redux/store.js`

### Supabase Query Ekleme

```javascript
// Mock data desteği ile
export const newQuery = createAsyncThunk(
  'slice/newQuery',
  async (params, { rejectWithValue }) => {
    try {
      // Mock mode check
      if (!isSupabaseConfigured) {
        console.warn('Using mock data');
        return MOCK_DATA;
      }

      // Supabase query
      const { data, error } = await supabase
        .from('table')
        .select('*');

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Testing

```bash
# Expo Go ile test
npm start

# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web (experimental)
npm run web
```

### Debugging

```javascript
// Redux DevTools
// Chrome: Redux DevTools Extension

// Console logs
console.log('Debug:', data);

// React Native Debugger
// Cmd+D (iOS) / Cmd+M (Android) → Debug

// Network requests
// Reactotron (optional)
```

---

## 📱 Build ve Deploy

### Development Build

```bash
# Expo Go ile test (önerilen)
npm start
```

### Production Build

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Her ikisi
eas build --platform all
```

### Environment Variables (Production)

```bash
# eas.json
{
  "build": {
    "production": {
      "env": {
        "SUPABASE_URL": "production_url",
        "SUPABASE_ANON_KEY": "production_key"
      }
    }
  }
}
```

---

## 🐛 Troubleshooting

### Hata: "Invalid supabaseUrl"
**Çözüm**: 
1. Uygulamayı durdurun
2. `npm start -- --clear` ile yeniden başlatın
3. `.env` dosyasını kontrol edin

### Hata: "Module not found"
**Çözüm**:
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

### Animasyonlar çalışmıyor
**Çözüm**:
1. `react-native-reanimated` kurulu mu kontrol edin
2. `babel.config.js` dosyasında plugin var mı kontrol edin
3. Uygulamayı yeniden başlatın

### Underwater background görünmüyor
**Çözüm**:
1. `assets/underwater-bg.png` dosyası var mı kontrol edin
2. Dosya yolu doğru mu: `../../../assets/underwater-bg.png`
3. Cache temizleyin: `npm start -- --clear`

---

## 📄 Lisans

MIT License

---

## 👥 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📞 İletişim

Proje Link: [GitHub Repository]

---

## 🙏 Teşekkürler

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Supabase](https://supabase.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)

---

**Yapımcı**: Su Takibi Team  
**Versiyon**: 1.0.0  
**Son Güncelleme**: 2026-01-31

💧 **Sağlıklı kalın, bol su için!** 💧
