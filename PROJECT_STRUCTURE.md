# Proje Yapısı ve Mimari

## 📁 Klasör Yapısı

```
sutakibiapp/
├── src/
│   ├── components/          # Yeniden kullanılabilir UI bileşenleri
│   │   ├── common/          # Genel bileşenler (Button, Input, Card, vb.)
│   │   ├── water/           # Su takibi ile ilgili bileşenler
│   │   └── onboarding/      # Onboarding bileşenleri
│   │
│   ├── screens/             # Ekran bileşenleri
│   │   ├── auth/            # Kimlik doğrulama ekranları
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── onboarding/      # Onboarding ekranları
│   │   │   ├── WelcomeScreen.js
│   │   │   ├── PersonalInfoScreen.js
│   │   │   ├── PhysicalInfoScreen.js
│   │   │   └── GoalSettingScreen.js
│   │   └── main/            # Ana uygulama ekranları
│   │       ├── DashboardScreen.js
│   │       ├── HistoryScreen.js
│   │       ├── SettingsScreen.js
│   │       └── ProfileScreen.js
│   │
│   ├── navigation/          # Navigasyon yapılandırması
│   │   ├── AppNavigator.js  # Ana navigasyon
│   │   ├── AuthNavigator.js # Auth stack
│   │   ├── OnboardingNavigator.js # Onboarding stack
│   │   └── MainNavigator.js # Main app tabs
│   │
│   ├── redux/               # Redux state yönetimi
│   │   ├── store.js         # Redux store
│   │   └── slices/
│   │       ├── authSlice.js # Kimlik doğrulama state
│   │       ├── userSlice.js # Kullanıcı profil state
│   │       └── waterSlice.js # Su takibi state
│   │
│   ├── services/            # Dış servisler
│   │   ├── supabase.js      # Supabase client
│   │   └── notificationService.js # Push notification servisi
│   │
│   ├── utils/               # Yardımcı fonksiyonlar
│   │   └── helpers.js       # Genel yardımcı fonksiyonlar
│   │
│   └── constants/           # Sabitler
│       └── waterContainers.js # Su kabı boyutları
│
├── assets/                  # Görseller, fontlar, vb.
├── .env                     # Environment variables (GİZLİ)
├── .env.example             # Environment variables şablonu
├── App.js                   # Ana uygulama giriş noktası
├── app.json                 # Expo konfigürasyonu
├── package.json             # NPM bağımlılıkları
├── DATABASE_SCHEMA.md       # Veritabanı şeması
└── README.md                # Proje dokümantasyonu
```

## 🏗️ Mimari Kararlar

### 1. State Management - Redux Toolkit
- **Neden Redux?**: Karmaşık state yönetimi, çoklu ekranlarda veri paylaşımı
- **Slices**:
  - `authSlice`: Kullanıcı kimlik doğrulama durumu
  - `userSlice`: Kullanıcı profil bilgileri ve onboarding durumu
  - `waterSlice`: Su tüketim verileri ve loglar

### 2. Backend - Supabase
- **Database**: PostgreSQL tabanlı, güçlü sorgulama
- **Authentication**: Built-in auth sistemi
- **Row Level Security**: Veri güvenliği
- **Real-time**: Gelecekte real-time özellikler eklenebilir

### 3. Push Notifications - Expo Notifications
- **Cross-platform**: iOS ve Android desteği
- **Local Notifications**: Cihazda zamanlanmış bildirimler
- **Push Tokens**: Gelecekte remote notifications için hazır

### 4. Navigation - React Navigation
- **Stack Navigator**: Auth ve Onboarding akışları için
- **Tab Navigator**: Ana uygulama ekranları için
- **Nested Navigation**: Karmaşık navigasyon yapıları

## 🔄 Veri Akışı

### Onboarding Flow
```
1. Register/Login (AuthSlice)
   ↓
2. Onboarding Screens (UserSlice - updateProfile)
   ↓
3. Save to Supabase (UserSlice - saveUserProfile)
   ↓
4. Navigate to Dashboard
```

### Water Logging Flow
```
1. User selects container (Dashboard)
   ↓
2. Dispatch logWaterIntake (WaterSlice)
   ↓
3. Save to Supabase (water_logs table)
   ↓
4. Update local state (todayLogs, todayTotal)
   ↓
5. Update UI (Progress bar, stats)
```

### Notification Flow
```
1. App Start → Register for notifications
   ↓
2. User completes onboarding → Schedule daily reminders
   ↓
3. Scheduled time → Send notification
   ↓
4. User taps notification → Open app to Dashboard
```

## 🗄️ Database Schema

### user_profiles
- Kullanıcı profil bilgileri
- Onboarding'de toplanan veriler
- Hedef ve ayarlar

### water_logs
- Su tüketim kayıtları
- Timestamp ile tarih/saat bilgisi
- Container ID ve volume

### notification_settings (Opsiyonel)
- Bildirim tercihleri
- Zamanlama ayarları
- Push token

## 🎯 Sonraki Adımlar

### Arayüz Geliştirme
1. ✅ Teknik altyapı tamamlandı
2. 🔄 Şimdi UI/UX tasarımına geçilecek:
   - Onboarding ekranları
   - Dashboard tasarımı
   - Su logging arayüzü
   - Ayarlar ve profil ekranları

### Geliştirme Sırası
1. Navigation yapısı
2. Auth ekranları (Login/Register)
3. Onboarding ekranları (4 adım)
4. Dashboard (Ana ekran)
5. Su logging bileşenleri
6. Ayarlar ekranı
7. Geçmiş/İstatistik ekranı

## 📦 Kurulu Paketler

- ✅ React Native (Expo)
- ✅ Redux Toolkit
- ✅ React Redux
- ✅ Supabase Client
- ✅ React Navigation
- ✅ Expo Notifications
- ✅ Safe Area Context
- ✅ React Native Screens

## 🔑 Önemli Notlar

1. **Environment Variables**: `.env` dosyası oluşturulmalı ve Supabase bilgileri eklenmelidir
2. **Database Setup**: `DATABASE_SCHEMA.md` dosyasındaki SQL komutları Supabase'de çalıştırılmalıdır
3. **Supabase Config**: `src/services/supabase.js` dosyası güncellenmelidir
4. **Push Notifications**: iOS için Apple Developer hesabı gerekebilir

## 🎨 Tasarım Sistemi (Planlanan)

- **Renk Paleti**: Modern, su temalı renkler (mavi tonları)
- **Typography**: Okunabilir, modern fontlar
- **Components**: Tutarlı, yeniden kullanılabilir bileşenler
- **Animations**: Smooth, kullanıcı dostu animasyonlar
- **Icons**: Su, bardak, şişe ikonları
