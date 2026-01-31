# 📋 Ekran Akışı ve Değişkenler - Özet

## ✅ Tamamlanan İşlemler

Aşağıdaki ekran akışı ve değişkenler tanımlanmıştır:

### 🔄 Ekran Akışı

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
Dashboard Screen ←→ History Screen ←→ Profile Screen ←→ Settings Screen
```

---

## 📝 Register Screen Değişkenleri

✅ **Email** (String)
- Kullanıcının benzersiz email adresi
- Supabase Auth tarafından benzersizlik garanti edilir
- Validasyon: Geçerli email formatı

✅ **Password** (String)
- Kullanıcının şifresi
- Validasyon: Minimum 6 karakter
- Supabase tarafından otomatik şifrelenir

✅ **Confirm Password** (String)
- Şifre doğrulama
- Validasyon: Password ile eşleşmeli

### Kod Örneği:
```javascript
const registerData = {
  email: 'user@example.com',
  password: 'securePass123',
  confirmPassword: 'securePass123'
};

// Redux action
dispatch(signUp({ email, password }));
```

---

## 🔐 Login Screen Değişkenleri

✅ **Email** (String)
- Sistemde kayıtlı email adresi
- Benzersiz olmalı

✅ **Password** (String)
- Kullanıcının şifresi

### Kod Örneği:
```javascript
const loginData = {
  email: 'user@example.com',
  password: 'securePass123'
};

// Redux action
dispatch(signIn({ email, password }));
```

---

## 👤 Tüm Kullanıcı Değişkenleri

### Authentication (Register/Login)
| Değişken | Tip | Ekran |
|----------|-----|-------|
| `email` | String | Register, Login |
| `password` | String | Register, Login |
| `confirmPassword` | String | Register |

### Personal Info Screen
| Değişken | Tip | Varsayılan |
|----------|-----|------------|
| `name` | String | - |
| `surname` | String | - |
| `birth_date` | Date | - |
| `gender` | String ('male', 'female', 'other') | - |
| `country` | String | - |

### Physical Info Screen
| Değişken | Tip | Varsayılan |
|----------|-----|------------|
| `weight` | Number (kg) | - |
| `height` | Number (cm) | - |

### Goal Setting Screen
| Değişken | Tip | Varsayılan |
|----------|-----|------------|
| `water_goal` | Number (liters) | 2.0 |
| `thermos` | Number (liters) | 0.5 |

---

## 🔍 Email Benzersizliği Nasıl Çalışır?

### Supabase Auth Sistemi

1. **Kayıt Sırasında:**
   - Kullanıcı email ve password girer
   - Supabase `auth.users` tablosunda email'i kontrol eder
   - Email zaten varsa → Hata döner: "User already registered"
   - Email yoksa → Yeni kullanıcı oluşturulur

2. **Giriş Sırasında:**
   - Kullanıcı email ve password girer
   - Supabase email ile kullanıcıyı arar
   - Email bulunamazsa → Hata: "Invalid login credentials"
   - Email bulunur, şifre yanlışsa → Hata: "Invalid login credentials"
   - Email ve şifre doğruysa → Giriş başarılı

### Database Yapısı

```sql
-- Supabase Auth (Otomatik yönetilir)
auth.users
├── id (UUID, PRIMARY KEY)
├── email (VARCHAR, UNIQUE) ← Benzersizlik burada garanti edilir
├── encrypted_password (VARCHAR)
└── created_at (TIMESTAMP)

-- User Profiles (Bizim tablomuz)
user_profiles
├── id (UUID, PRIMARY KEY)
├── user_id (UUID, REFERENCES auth.users.id, UNIQUE)
├── name, surname, birth_date, gender, etc.
└── ...
```

---

## 🚀 Redux State Yönetimi

### Auth State (authSlice.js)
```javascript
{
  user: {
    id: 'uuid',
    email: 'user@example.com',
    // ... Supabase user object
  },
  session: { /* Supabase session */ },
  loading: false,
  error: null,
  isAuthenticated: true
}
```

### User State (userSlice.js)
```javascript
{
  profile: {
    name: '',
    surname: '',
    birth_date: null,
    gender: '',
    weight: null,
    height: null,
    country: '',
    thermos: 0.5,
    water_goal: 2.0
  },
  loading: false,
  error: null,
  onboardingCompleted: false
}
```

---

## 📊 Veri Akışı

### Kayıt Akışı (Registration Flow)

```
1. User enters email & password in Register Screen
   ↓
2. dispatch(signUp({ email, password }))
   ↓
3. Supabase creates user in auth.users
   ↓
4. Navigate to Personal Info Screen
   ↓
5. User completes onboarding (3 screens)
   ↓
6. dispatch(saveUserProfile(profileData))
   ↓
7. Save to user_profiles table
   ↓
8. Navigate to Dashboard
```

### Giriş Akışı (Login Flow)

```
1. User enters email & password in Login Screen
   ↓
2. dispatch(signIn({ email, password }))
   ↓
3. Supabase verifies credentials
   ↓
4. dispatch(fetchUserProfile())
   ↓
5. Check if onboarding completed
   ↓
6. Navigate to Dashboard (if completed)
   OR
   Navigate to Personal Info (if not completed)
```

---

## 📁 İlgili Dosyalar

### Kod Dosyaları
- `src/redux/slices/authSlice.js` - Authentication logic
- `src/redux/slices/userSlice.js` - User profile logic
- `src/services/supabase.js` - Supabase client

### Dokümantasyon Dosyaları
- `APP_FLOW_AND_VARIABLES.md` - Detaylı akış ve değişkenler
- `SCREEN_FLOW_DIAGRAM.md` - Görsel diyagramlar
- `VARIABLES_REFERENCE.md` - Hızlı referans
- `DATABASE_SCHEMA.md` - Veritabanı şeması

---

## ✅ Kontrol Listesi

### Register Screen
- [x] Email değişkeni tanımlandı
- [x] Password değişkeni tanımlandı
- [x] Confirm Password değişkeni tanımlandı
- [x] Email benzersizliği Supabase tarafından garanti ediliyor
- [x] Redux action (signUp) mevcut

### Login Screen
- [x] Email değişkeni tanımlandı
- [x] Password değişkeni tanımlandı
- [x] Sadece kayıtlı emailler giriş yapabiliyor
- [x] Redux action (signIn) mevcut

### Onboarding Screens
- [x] Personal Info değişkenleri tanımlandı
- [x] Physical Info değişkenleri tanımlandı
- [x] Goal Setting değişkenleri tanımlandı
- [x] Redux actions (updateProfile, saveUserProfile) mevcut

### Database
- [x] auth.users tablosu (Supabase Auth)
- [x] user_profiles tablosu şeması hazır
- [x] Email benzersizliği garanti ediliyor

---

## 🎯 Sonraki Adımlar

### UI Geliştirme
1. Register Screen UI oluştur
2. Login Screen UI oluştur
3. Personal Info Screen UI oluştur
4. Physical Info Screen UI oluştur
5. Goal Setting Screen UI oluştur
6. Dashboard Screen UI oluştur

### Navigation
1. Auth Navigator oluştur (Welcome, Login, Register)
2. Onboarding Navigator oluştur (Personal, Physical, Goal)
3. Main Navigator oluştur (Dashboard, History, Profile, Settings)
4. App Navigator oluştur (tüm navigatorları birleştir)

### Testing
1. Email benzersizliği testi
2. Login/Register akış testi
3. Onboarding akış testi
4. Database kayıt testi

---

## 📞 Yardım

Daha fazla bilgi için ilgili dokümantasyon dosyalarına bakın:

- **Ekran akışı detayları**: `APP_FLOW_AND_VARIABLES.md`
- **Görsel diyagramlar**: `SCREEN_FLOW_DIAGRAM.md`
- **Değişken referansı**: `VARIABLES_REFERENCE.md`
- **Proje yapısı**: `PROJECT_STRUCTURE.md`
- **Database şeması**: `DATABASE_SCHEMA.md`

---

## ✨ Özet

✅ **Email ve Password değişkenleri tanımlandı**
✅ **Register Screen'de email, password, confirmPassword isteniyor**
✅ **Login Screen'de email ve password isteniyor**
✅ **Email benzersizliği Supabase Auth tarafından garanti ediliyor**
✅ **Kullanıcılar sadece kayıtlı email adresleri ile giriş yapabilir**
✅ **Tüm ekran akışı ve değişkenler dokümante edildi**
✅ **Redux state yönetimi hazır**
✅ **Database şeması hazır**

Tüm değişkenler ve akışlar hazır! Şimdi UI geliştirmeye başlanabilir. 🚀
