# Su Takibi Uygulaması - Kurulum ve Başlangıç Kılavuzu

## ✅ Tamamlanan Adımlar

### 1. Proje Oluşturma
- ✅ Expo React Native projesi oluşturuldu
- ✅ Gerekli tüm bağımlılıklar yüklendi

### 2. Klasör Yapısı
```
src/
├── components/          # UI bileşenleri için (henüz boş)
├── screens/            # Ekranlar için (henüz boş)
├── navigation/         # Navigasyon için (henüz boş)
├── redux/              # State management
│   ├── store.js        ✅ Redux store yapılandırması
│   └── slices/
│       ├── authSlice.js    ✅ Kimlik doğrulama
│       ├── userSlice.js    ✅ Kullanıcı profili
│       └── waterSlice.js   ✅ Su takibi
├── services/
│   ├── supabase.js         ✅ Supabase client
│   └── notificationService.js ✅ Push notifications
├── utils/
│   └── helpers.js          ✅ Yardımcı fonksiyonlar
└── constants/
    └── waterContainers.js  ✅ Su kabı boyutları
```

### 3. Redux State Management
✅ **authSlice.js** - Kimlik doğrulama yönetimi
- signUp, signIn, signOut fonksiyonları
- Session kontrolü
- Kullanıcı durumu

✅ **userSlice.js** - Kullanıcı profil yönetimi
- Onboarding verileri (name, surname, birth_date, gender, weight, height, country, thermos, water_goal)
- Profil kaydetme ve güncelleme
- Termos boyutu güncelleme

✅ **waterSlice.js** - Su tüketimi takibi
- Su tüketimi kaydetme
- Günlük logları getirme
- Geçmiş verileri getirme
- Log silme

### 4. Supabase Entegrasyonu
✅ **supabase.js** - Client yapılandırması
- Supabase bağlantısı hazır
- Environment variables ile yapılandırılacak

✅ **DATABASE_SCHEMA.md** - Veritabanı şeması
- user_profiles tablosu
- water_logs tablosu
- notification_settings tablosu
- Row Level Security politikaları

### 5. Push Notifications
✅ **notificationService.js** - Bildirim servisi
- Bildirim izni alma
- Günlük hatırlatıcılar zamanlama
- Anlık bildirim gönderme
- Expo Notifications kullanımı

### 6. Yardımcı Fonksiyonlar
✅ **helpers.js** - Utility fonksiyonları
- Su hedefi hesaplama
- Yaş hesaplama
- BMI hesaplama
- Hacim formatlama
- İlerleme yüzdesi hesaplama
- Tarih/saat formatlama

✅ **waterContainers.js** - Su kabı sabitleri
- 10 farklı standart kap boyutu
- Termos (kullanıcı tanımlı)
- Kap ID'leri ve hacimleri

### 7. Dokümantasyon
✅ **README.md** - Proje dokümantasyonu
✅ **DATABASE_SCHEMA.md** - Veritabanı şeması
✅ **PROJECT_STRUCTURE.md** - Mimari ve yapı
✅ **.env.example** - Environment variables şablonu

## 🔧 Yapılması Gerekenler

### 1. Supabase Kurulumu (ÖNEMLİ!)
```bash
# 1. Supabase'de yeni proje oluşturun
# 2. DATABASE_SCHEMA.md dosyasındaki SQL komutlarını çalıştırın
# 3. .env dosyası oluşturun
cp .env.example .env

# 4. .env dosyasını düzenleyin ve Supabase bilgilerinizi ekleyin
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# 5. src/services/supabase.js dosyasını güncelleyin
```

### 2. Arayüz Geliştirme (Sonraki Adım)
Şimdi aşağıdaki ekranları oluşturacağız:

#### A. Navigation Yapısı
- [ ] AppNavigator.js (Ana navigasyon)
- [ ] AuthNavigator.js (Login/Register)
- [ ] OnboardingNavigator.js (Onboarding akışı)
- [ ] MainNavigator.js (Tab navigation)

#### B. Auth Ekranları
- [ ] LoginScreen.js
- [ ] RegisterScreen.js

#### C. Onboarding Ekranları (4 adım)
- [ ] WelcomeScreen.js
- [ ] PersonalInfoScreen.js (name, surname, birth_date, gender)
- [ ] PhysicalInfoScreen.js (weight, height, country)
- [ ] GoalSettingScreen.js (thermos, water_goal)

#### D. Ana Ekranlar
- [ ] DashboardScreen.js (Ana ekran - su logging)
- [ ] HistoryScreen.js (Geçmiş veriler)
- [ ] SettingsScreen.js (Ayarlar)
- [ ] ProfileScreen.js (Profil)

#### E. Bileşenler
- [ ] WaterContainerButton.js (Su kabı seçimi)
- [ ] ProgressCircle.js (İlerleme göstergesi)
- [ ] WaterLogCard.js (Su tüketim kartı)
- [ ] CustomButton.js (Genel buton)
- [ ] CustomInput.js (Genel input)

## 🎨 Tasarım Önerileri

### Renk Paleti
```javascript
const colors = {
  primary: '#4A90E2',      // Ana mavi
  secondary: '#50C9CE',    // Açık mavi/turkuaz
  accent: '#F5A623',       // Turuncu (hedef tamamlama)
  background: '#F8F9FA',   // Açık gri arka plan
  text: '#2C3E50',         // Koyu gri metin
  textLight: '#7F8C8D',    // Açık gri metin
  success: '#2ECC71',      // Yeşil (başarı)
  warning: '#F39C12',      // Turuncu (uyarı)
  error: '#E74C3C',        // Kırmızı (hata)
  white: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E1E8ED',
};
```

### Typography
```javascript
const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: 'normal' },
  caption: { fontSize: 14, fontWeight: 'normal' },
  small: { fontSize: 12, fontWeight: 'normal' },
};
```

## 🚀 Uygulamayı Test Etme

```bash
# Uygulamayı başlatın
npm start

# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web (test için)
npm run web
```

## 📱 Özellik Listesi

### Onboarding
- [x] Kullanıcı kayıt/giriş
- [x] Kişisel bilgiler toplama
- [x] Fiziksel bilgiler toplama
- [x] Hedef belirleme
- [x] Veritabanına kaydetme

### Dashboard
- [ ] Günlük ilerleme göstergesi
- [ ] Su kabı seçimi (11 farklı seçenek)
- [ ] Hızlı su ekleme
- [ ] Günlük hedef gösterimi
- [ ] Son eklenen loglar

### Data Logging
- [x] Su tüketimi kaydetme
- [x] Farklı kap boyutları
- [x] Özel termos boyutu
- [x] Timestamp ile kayıt
- [ ] Log silme özelliği

### Notifications
- [x] Push notification izni
- [x] Günlük hatırlatıcılar
- [x] Özelleştirilebilir zamanlar
- [ ] Hedef tamamlama bildirimi

### Settings
- [ ] Profil düzenleme
- [ ] Hedef güncelleme
- [ ] Termos boyutu değiştirme
- [ ] Bildirim ayarları
- [ ] Hesaptan çıkış

## 🎯 Sonraki Adım

Teknik altyapı hazır! Şimdi **arayüz geliştirmeye** başlayabiliriz.

Hangi ekranla başlamak istersiniz?
1. Navigation yapısı
2. Auth ekranları (Login/Register)
3. Onboarding ekranları
4. Dashboard (Ana ekran)

Veya hepsini sırayla mı oluşturalım?
