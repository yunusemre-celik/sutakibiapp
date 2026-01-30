# Su Takibi Uygulaması (Water Tracking App)

Kullanıcıların günlük su tüketimini takip etmelerine, hedefler belirlemelerine ve bildirimler almalarına olanak sağlayan cross-platform mobil uygulama.

## 🚀 Özellikler

- ✅ **Kullanıcı Onboarding**: Kişiselleştirilmiş profil oluşturma
- 📊 **Dashboard**: Günlük su tüketimi takibi ve görselleştirme
- 💧 **Su Kaydı**: Farklı kap boyutları ile kolay su tüketimi kaydı
- 🔔 **Push Notifications**: Düzenli su içme hatırlatıcıları
- 📈 **Veri Analizi**: Geçmiş tüketim verilerini görüntüleme
- 🎯 **Hedef Takibi**: Günlük su hedefine ulaşma durumu
- ⚙️ **Özelleştirme**: Termos boyutu ve hedef ayarlama

## 🛠️ Teknoloji Stack

- **Framework**: React Native (Expo)
- **State Management**: Redux Toolkit
- **Backend**: Supabase (Database + Authentication)
- **Push Notifications**: Expo Notifications
- **Navigation**: React Navigation

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- Supabase hesabı

## 🔧 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. `DATABASE_SCHEMA.md` dosyasındaki SQL komutlarını Supabase SQL Editor'de çalıştırın
4. Authentication > Providers > Email etkinleştirin

### 3. Environment Variables

`.env` dosyası oluşturun:

```bash
cp .env.example .env
```

`.env` dosyasını Supabase bilgilerinizle güncelleyin:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Config Güncelleme

`src/services/supabase.js` dosyasını `.env` dosyanızdaki bilgilerle güncelleyin.

## 🚀 Uygulamayı Çalıştırma

### Development

```bash
npm start
```

### iOS Simulator

```bash
npm run ios
```

### Android Emulator

```bash
npm run android
```

### Web

```bash
npm run web
```

## 📱 Uygulama Yapısı

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
│   ├── onboarding/     # Onboarding screens
│   ├── auth/           # Authentication screens
│   └── main/           # Main app screens (Dashboard, etc.)
├── navigation/         # Navigation configuration
├── redux/              # Redux store and slices
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── userSlice.js
│       └── waterSlice.js
├── services/           # External services
│   ├── supabase.js
│   └── notificationService.js
├── utils/              # Utility functions
│   └── helpers.js
└── constants/          # App constants
    └── waterContainers.js
```

## 📊 Database Schema

Uygulama 3 ana tablo kullanır:

1. **user_profiles**: Kullanıcı profil bilgileri
2. **water_logs**: Su tüketim kayıtları
3. **notification_settings**: Bildirim ayarları (opsiyonel)

Detaylı schema için `DATABASE_SCHEMA.md` dosyasına bakın.

## 🎨 Onboarding Verileri

Kullanıcıdan toplanan veriler:
- İsim (name)
- Soyisim (surname)
- Doğum tarihi (birth_date)
- Cinsiyet (gender)
- Kilo (weight - kg)
- Boy (height - cm)
- Ülke (country)
- Termos boyutu (thermos - litre)
- Su hedefi (water_goal - litre)

## 💧 Su Kabı Boyutları

Uygulama aşağıdaki standart kap boyutlarını destekler:

- Shot Bardağı: 0.04L
- Çay Bardağı: 0.125L
- Küçük Su Bardağı: 0.2L
- Orta Su Bardağı: 0.18L
- Büyük Su Bardağı: 0.35L
- Uzun Su Bardağı: 0.5L
- Küçük Şişe Su: 0.25L
- Orta Şişe Su: 0.5L
- Büyük Şişe Su: 1.0L
- Çok Büyük Şişe Su: 1.5L
- Termos: Kullanıcı tanımlı

## 🔔 Push Notifications

Uygulama Expo Notifications kullanarak:
- Günlük düzenli hatırlatıcılar (varsayılan: 08:00 - 20:00 arası 2 saatte bir)
- Hedef tamamlama bildirimleri
- Özelleştirilebilir bildirim zamanları

## 🔐 Authentication

Supabase Authentication ile:
- Email/Password ile kayıt
- Email/Password ile giriş
- Oturum yönetimi
- Row Level Security (RLS) ile veri güvenliği

## 📝 Lisans

MIT

## 👥 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açarak neyi değiştirmek istediğinizi tartışın.

## 📧 İletişim

Sorularınız için issue açabilirsiniz.
