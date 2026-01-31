# Uygulama Akışı ve Değişkenler

## 🔄 Ekran Akışı (Screen Flow)

```
Welcome Screen
    ↓
Login Screen ←→ Register Screen
    ↓
Personal Info Screen
    ↓
Physical Info Screen
    ↓
Goal Setting Screen
    ↓
Dashboard Screen ←→ History Screen
    ↓               ↓
Profile Screen ←→ Settings Screen
```

### Detaylı Akış Açıklaması

1. **Welcome Screen** (Hoş Geldiniz Ekranı)
   - İlk açılış ekranı
   - Uygulama tanıtımı
   - "Giriş Yap" ve "Kayıt Ol" butonları

2. **Login Screen** (Giriş Ekranı)
   - Email ile giriş
   - Şifre girişi
   - "Şifremi Unuttum" linki
   - "Kayıt Ol" sayfasına geçiş

3. **Register Screen** (Kayıt Ekranı)
   - Email adresi (benzersiz olmalı)
   - Şifre oluşturma
   - Şifre tekrarı
   - "Giriş Yap" sayfasına geçiş

4. **Personal Info Screen** (Kişisel Bilgiler Ekranı)
   - Ad
   - Soyad
   - Doğum tarihi
   - Cinsiyet
   - Ülke

5. **Physical Info Screen** (Fiziksel Bilgiler Ekranı)
   - Kilo (kg)
   - Boy (cm)

6. **Goal Setting Screen** (Hedef Belirleme Ekranı)
   - Günlük su hedefi (litre)
   - Termos boyutu (litre)

7. **Dashboard Screen** (Ana Ekran)
   - Su tüketim göstergesi
   - Hızlı su ekleme butonları
   - Günlük ilerleme
   - Geçmiş ve Profil ekranlarına erişim

8. **History Screen** (Geçmiş Ekranı)
   - Günlük su tüketim geçmişi
   - İstatistikler
   - Grafikler

9. **Profile Screen** (Profil Ekranı)
   - Kullanıcı bilgileri görüntüleme
   - Profil düzenleme
   - Ayarlar ekranına erişim

10. **Settings Screen** (Ayarlar Ekranı)
    - Bildirim ayarları
    - Hedef güncelleme
    - Hesap ayarları
    - Çıkış yapma

---

## 📝 Değişkenler (Variables)

### 1. Authentication Variables (Kimlik Doğrulama)

#### Register Screen Variables
```javascript
const registerVariables = {
  email: '',           // String - Kullanıcının email adresi (benzersiz)
  password: '',        // String - Kullanıcının şifresi (min 6 karakter)
  confirmPassword: '', // String - Şifre doğrulama
};
```

**Validasyon Kuralları:**
- `email`: Geçerli email formatı, benzersiz olmalı
- `password`: Minimum 6 karakter
- `confirmPassword`: password ile eşleşmeli

#### Login Screen Variables
```javascript
const loginVariables = {
  email: '',    // String - Kayıtlı email adresi
  password: '', // String - Kullanıcının şifresi
};
```

**Validasyon Kuralları:**
- `email`: Sistemde kayıtlı olmalı
- `password`: Doğru şifre girilmeli

---

### 2. Personal Info Screen Variables

```javascript
const personalInfoVariables = {
  name: '',         // String - Kullanıcının adı
  surname: '',      // String - Kullanıcının soyadı
  birth_date: null, // Date - Doğum tarihi
  gender: '',       // String - 'male', 'female', 'other'
  country: '',      // String - Ülke adı
};
```

**Validasyon Kuralları:**
- `name`: Boş olamaz, minimum 2 karakter
- `surname`: Boş olamaz, minimum 2 karakter
- `birth_date`: Geçerli tarih, kullanıcı 13 yaşından büyük olmalı
- `gender`: 'male', 'female', veya 'other' değerlerinden biri
- `country`: Boş olamaz

---

### 3. Physical Info Screen Variables

```javascript
const physicalInfoVariables = {
  weight: null, // Number (Decimal) - Kilo (kg cinsinden)
  height: null, // Number (Decimal) - Boy (cm cinsinden)
};
```

**Validasyon Kuralları:**
- `weight`: 20-300 kg arası
- `height`: 50-250 cm arası

---

### 4. Goal Setting Screen Variables

```javascript
const goalSettingVariables = {
  water_goal: 2.0, // Number (Decimal) - Günlük su hedefi (litre)
  thermos: 0.5,    // Number (Decimal) - Termos boyutu (litre)
};
```

**Validasyon Kuralları:**
- `water_goal`: 0.5-10 litre arası
- `thermos`: 0.1-5 litre arası

---

## 🔐 Authentication Flow (Kimlik Doğrulama Akışı)

### Registration Flow
```javascript
// 1. Kullanıcı Register Screen'de bilgileri girer
const registrationData = {
  email: 'user@example.com',
  password: 'securePassword123',
};

// 2. Redux action dispatch edilir
dispatch(signUp({ email, password }));

// 3. Supabase'de yeni kullanıcı oluşturulur
// 4. Başarılı olursa, kullanıcı Personal Info Screen'e yönlendirilir
// 5. Onboarding ekranları tamamlanır
// 6. Profil bilgileri Supabase'e kaydedilir
dispatch(saveUserProfile(profileData));

// 7. Dashboard'a yönlendirilir
```

### Login Flow
```javascript
// 1. Kullanıcı Login Screen'de email ve şifresini girer
const loginData = {
  email: 'user@example.com',
  password: 'securePassword123',
};

// 2. Redux action dispatch edilir
dispatch(signIn({ email, password }));

// 3. Supabase email ile kullanıcıyı doğrular
// 4. Başarılı olursa, kullanıcı profili kontrol edilir
dispatch(fetchUserProfile());

// 5. Eğer onboarding tamamlanmışsa → Dashboard
//    Eğer onboarding tamamlanmamışsa → Personal Info Screen
```

---

## 🗄️ Redux State Yapısı

### Auth State
```javascript
{
  auth: {
    user: {
      id: 'uuid',
      email: 'user@example.com',
      // ... diğer Supabase user bilgileri
    },
    session: { /* Supabase session */ },
    loading: false,
    error: null,
    isAuthenticated: true,
  }
}
```

### User State
```javascript
{
  user: {
    profile: {
      name: 'Ahmet',
      surname: 'Yılmaz',
      birth_date: '1990-01-01',
      gender: 'male',
      weight: 75.5,
      height: 175.0,
      country: 'Türkiye',
      thermos: 0.5,
      water_goal: 2.5,
    },
    loading: false,
    error: null,
    onboardingCompleted: true,
  }
}
```

---

## 📊 Database Schema (Veritabanı Şeması)

### auth.users (Supabase Auth)
```sql
-- Supabase tarafından otomatik yönetilir
id UUID PRIMARY KEY
email VARCHAR UNIQUE
encrypted_password VARCHAR
created_at TIMESTAMP
```

### user_profiles
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES auth.users(id) -- Email ile ilişkilendirilir
name VARCHAR(100)
surname VARCHAR(100)
birth_date DATE
gender VARCHAR(20)
weight DECIMAL(5,2)
height DECIMAL(5,2)
country VARCHAR(100)
thermos DECIMAL(5,3)
water_goal DECIMAL(5,3)
created_at TIMESTAMP
updated_at TIMESTAMP
```

---

## 🔍 Email Benzersizliği (Unique Email)

### Supabase Auth Kontrolü
- Supabase, `auth.users` tablosunda email'leri otomatik olarak benzersiz tutar
- Aynı email ile ikinci kayıt denemesi otomatik olarak reddedilir
- Hata mesajı: "User already registered"

### Kod Örneği
```javascript
// Register işlemi
try {
  const { data, error } = await supabase.auth.signUp({
    email: 'user@example.com',
    password: 'password123',
  });
  
  if (error) {
    // Email zaten kayıtlı ise error.message içerir
    console.error('Registration error:', error.message);
  }
} catch (error) {
  console.error('Error:', error);
}

// Login işlemi - Sadece kayıtlı email'ler giriş yapabilir
try {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'user@example.com',
    password: 'password123',
  });
  
  if (error) {
    // Email bulunamadı veya şifre yanlış
    console.error('Login error:', error.message);
  }
} catch (error) {
  console.error('Error:', error);
}
```

---

## 📱 Ekran Geçişleri (Navigation)

### Navigator Yapısı
```javascript
AppNavigator
├── AuthNavigator (Stack)
│   ├── WelcomeScreen
│   ├── LoginScreen
│   └── RegisterScreen
│
├── OnboardingNavigator (Stack)
│   ├── PersonalInfoScreen
│   ├── PhysicalInfoScreen
│   └── GoalSettingScreen
│
└── MainNavigator (Tab)
    ├── DashboardScreen
    ├── HistoryScreen
    ├── ProfileScreen
    └── SettingsScreen
```

### Geçiş Koşulları
```javascript
// App.js veya AppNavigator.js içinde
if (!isAuthenticated) {
  return <AuthNavigator />;
}

if (!onboardingCompleted) {
  return <OnboardingNavigator />;
}

return <MainNavigator />;
```

---

## ✅ Özet

### Register Screen'de İstenen Bilgiler:
1. ✅ **Email** (benzersiz)
2. ✅ **Password** (şifre oluşturma)
3. ✅ **Confirm Password** (şifre doğrulama)

### Login Screen'de İstenen Bilgiler:
1. ✅ **Email** (benzersiz, kayıtlı olmalı)
2. ✅ **Password**

### Tüm Değişkenler:
- **Auth**: email, password, confirmPassword
- **Personal Info**: name, surname, birth_date, gender, country
- **Physical Info**: weight, height
- **Goal Setting**: water_goal, thermos

### Önemli Notlar:
- Email adresleri Supabase Auth tarafından otomatik olarak benzersiz tutulur
- Kullanıcılar sadece kayıtlı email adresleri ile giriş yapabilir
- Tüm değişkenler Redux store'da yönetilir
- Profil bilgileri Supabase'de saklanır
