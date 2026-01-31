# Değişkenler Hızlı Referans

## 🔐 Authentication Variables

### Register Screen
| Variable | Type | Required | Validation | Description |
|----------|------|----------|------------|-------------|
| `email` | String | ✅ Yes | Valid email format, unique | Kullanıcının email adresi |
| `password` | String | ✅ Yes | Min 6 characters | Kullanıcının şifresi |
| `confirmPassword` | String | ✅ Yes | Must match password | Şifre doğrulama |

**Example:**
```javascript
{
  email: "ahmet@example.com",
  password: "securePass123",
  confirmPassword: "securePass123"
}
```

---

### Login Screen
| Variable | Type | Required | Validation | Description |
|----------|------|----------|------------|-------------|
| `email` | String | ✅ Yes | Must be registered | Kayıtlı email adresi |
| `password` | String | ✅ Yes | Correct password | Kullanıcının şifresi |

**Example:**
```javascript
{
  email: "ahmet@example.com",
  password: "securePass123"
}
```

---

## 👤 Personal Info Variables

### Personal Info Screen
| Variable | Type | Required | Validation | Description |
|----------|------|----------|------------|-------------|
| `name` | String | ✅ Yes | Min 2 characters | Kullanıcının adı |
| `surname` | String | ✅ Yes | Min 2 characters | Kullanıcının soyadı |
| `birth_date` | Date | ✅ Yes | Valid date, age ≥ 13 | Doğum tarihi |
| `gender` | String | ✅ Yes | 'male', 'female', 'other' | Cinsiyet |
| `country` | String | ✅ Yes | Not empty | Ülke adı |

**Example:**
```javascript
{
  name: "Ahmet",
  surname: "Yılmaz",
  birth_date: "1990-05-15",
  gender: "male",
  country: "Türkiye"
}
```

---

## 📏 Physical Info Variables

### Physical Info Screen
| Variable | Type | Required | Validation | Description |
|----------|------|----------|------------|-------------|
| `weight` | Number (Decimal) | ✅ Yes | 20-300 kg | Kilo (kg cinsinden) |
| `height` | Number (Decimal) | ✅ Yes | 50-250 cm | Boy (cm cinsinden) |

**Example:**
```javascript
{
  weight: 75.5,
  height: 175.0
}
```

---

## 🎯 Goal Setting Variables

### Goal Setting Screen
| Variable | Type | Required | Validation | Description |
|----------|------|----------|------------|-------------|
| `water_goal` | Number (Decimal) | ✅ Yes | 0.5-10 liters | Günlük su hedefi (litre) |
| `thermos` | Number (Decimal) | ✅ Yes | 0.1-5 liters | Termos boyutu (litre) |

**Example:**
```javascript
{
  water_goal: 2.5,
  thermos: 0.5
}
```

---

## 📦 Complete User Profile Object

### Full Profile Data Structure
```javascript
const completeUserProfile = {
  // Authentication (Supabase Auth)
  email: "ahmet@example.com",
  password: "securePass123", // Only used during registration/login
  
  // Personal Information
  name: "Ahmet",
  surname: "Yılmaz",
  birth_date: "1990-05-15",
  gender: "male",
  country: "Türkiye",
  
  // Physical Information
  weight: 75.5,
  height: 175.0,
  
  // Goal Settings
  water_goal: 2.5,
  thermos: 0.5,
  
  // System Fields (Auto-generated)
  user_id: "uuid-from-supabase",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
};
```

---

## 🔄 Redux Actions Reference

### Auth Actions
```javascript
// Registration
dispatch(signUp({ 
  email: "user@example.com", 
  password: "password123" 
}));

// Login
dispatch(signIn({ 
  email: "user@example.com", 
  password: "password123" 
}));

// Logout
dispatch(signOut());

// Check Session
dispatch(checkSession());
```

### User Profile Actions
```javascript
// Update profile (local state)
dispatch(updateProfile({
  name: "Ahmet",
  surname: "Yılmaz",
  // ... other fields
}));

// Save profile to database
dispatch(saveUserProfile({
  name: "Ahmet",
  surname: "Yılmaz",
  birth_date: "1990-05-15",
  gender: "male",
  weight: 75.5,
  height: 175.0,
  country: "Türkiye",
  thermos: 0.5,
  water_goal: 2.5
}));

// Fetch profile from database
dispatch(fetchUserProfile());

// Update thermos size
dispatch(updateThermos(0.75));

// Mark onboarding as completed
dispatch(setOnboardingCompleted(true));
```

---

## 🎨 Form Field Examples

### Register Screen Form
```javascript
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    // Validate
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    
    // Dispatch
    dispatch(signUp({
      email: formData.email,
      password: formData.password
    }));
  };
};
```

### Personal Info Screen Form
```javascript
const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birth_date: null,
    gender: '',
    country: ''
  });

  const handleNext = () => {
    // Update Redux state
    dispatch(updateProfile(formData));
    
    // Navigate to next screen
    navigation.navigate('PhysicalInfo');
  };
};
```

### Physical Info Screen Form
```javascript
const PhysicalInfoForm = () => {
  const [formData, setFormData] = useState({
    weight: null,
    height: null
  });

  const handleNext = () => {
    // Update Redux state
    dispatch(updateProfile(formData));
    
    // Navigate to next screen
    navigation.navigate('GoalSetting');
  };
};
```

### Goal Setting Screen Form
```javascript
const GoalSettingForm = () => {
  const [formData, setFormData] = useState({
    water_goal: 2.0,
    thermos: 0.5
  });

  const handleComplete = async () => {
    // Update Redux state
    dispatch(updateProfile(formData));
    
    // Get complete profile from Redux
    const completeProfile = useSelector(state => state.user.profile);
    
    // Save to database
    await dispatch(saveUserProfile(completeProfile));
    
    // Navigate to Dashboard
    navigation.navigate('Dashboard');
  };
};
```

---

## 🗄️ Database Tables

### auth.users (Supabase Auth - Auto-managed)
```sql
id              UUID PRIMARY KEY
email           VARCHAR UNIQUE          -- ✅ Benzersiz email
encrypted_password VARCHAR              -- ✅ Şifreli password
created_at      TIMESTAMP
```

### user_profiles (Custom Table)
```sql
id              UUID PRIMARY KEY
user_id         UUID UNIQUE             -- Links to auth.users
name            VARCHAR(100)            -- ✅ Ad
surname         VARCHAR(100)            -- ✅ Soyad
birth_date      DATE                    -- ✅ Doğum tarihi
gender          VARCHAR(20)             -- ✅ Cinsiyet
weight          DECIMAL(5,2)            -- ✅ Kilo
height          DECIMAL(5,2)            -- ✅ Boy
country         VARCHAR(100)            -- ✅ Ülke
thermos         DECIMAL(5,3)            -- ✅ Termos boyutu
water_goal      DECIMAL(5,3)            -- ✅ Su hedefi
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

---

## ✅ Validation Rules Summary

### Email
- ✅ Valid email format (contains @)
- ✅ Must be unique (Supabase enforces)
- ✅ Required field

### Password
- ✅ Minimum 6 characters
- ✅ Required field
- ✅ Must match confirmPassword (register only)

### Name & Surname
- ✅ Minimum 2 characters
- ✅ Required fields
- ✅ Only letters (optional validation)

### Birth Date
- ✅ Valid date format
- ✅ User must be ≥ 13 years old
- ✅ Required field

### Gender
- ✅ Must be one of: 'male', 'female', 'other'
- ✅ Required field

### Weight
- ✅ Range: 20-300 kg
- ✅ Decimal number (e.g., 75.5)
- ✅ Required field

### Height
- ✅ Range: 50-250 cm
- ✅ Decimal number (e.g., 175.0)
- ✅ Required field

### Water Goal
- ✅ Range: 0.5-10 liters
- ✅ Decimal number (e.g., 2.5)
- ✅ Required field

### Thermos
- ✅ Range: 0.1-5 liters
- ✅ Decimal number (e.g., 0.5)
- ✅ Required field

---

## 🚀 Quick Start Checklist

### For Register Screen:
- [ ] Email input field
- [ ] Password input field (secure)
- [ ] Confirm password input field (secure)
- [ ] Email validation
- [ ] Password match validation
- [ ] Submit button
- [ ] Link to Login screen

### For Login Screen:
- [ ] Email input field
- [ ] Password input field (secure)
- [ ] Submit button
- [ ] "Forgot Password" link
- [ ] Link to Register screen

### For Personal Info Screen:
- [ ] Name input field
- [ ] Surname input field
- [ ] Birth date picker
- [ ] Gender selector (dropdown/radio)
- [ ] Country input/selector
- [ ] Next button
- [ ] Progress indicator (Step 1/3)

### For Physical Info Screen:
- [ ] Weight input field (numeric)
- [ ] Height input field (numeric)
- [ ] Next button
- [ ] Back button
- [ ] Progress indicator (Step 2/3)

### For Goal Setting Screen:
- [ ] Water goal input/slider
- [ ] Thermos size input/selector
- [ ] Complete button
- [ ] Back button
- [ ] Progress indicator (Step 3/3)

---

## 📝 Notes

1. **Email Uniqueness**: Supabase Auth automatically ensures email uniqueness. No additional validation needed.

2. **Password Security**: Passwords are automatically encrypted by Supabase. Never store plain text passwords.

3. **Data Flow**: 
   - Register → Collect data in onboarding → Save to database
   - Login → Fetch existing profile → Navigate to Dashboard

4. **State Management**: All variables are managed through Redux slices (authSlice, userSlice).

5. **Database Sync**: User profile is saved to Supabase after completing all onboarding screens.
