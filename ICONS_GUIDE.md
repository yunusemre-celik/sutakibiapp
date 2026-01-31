# 🎨 İkon Kılavuzu

## 📦 Kullanılan Kütüphane

**@expo/vector-icons** - Expo ile birlikte gelen, cross-platform ikon kütüphanesi

### Kurulum
```bash
npm install @expo/vector-icons
```

✅ **Kurulum Tamamlandı!**

---

## 🎯 İkon Seti

**Feather Icons** - Modern, minimal ve tutarlı tasarım

### Renk Kodu
```javascript
const PRIMARY_COLOR = '#2267f2';
```

---

## 📋 İkon Listesi ve Kullanım

### 1. Authentication & Onboarding Icons

#### Hand (Welcome/Greeting)
```javascript
import { Feather } from '@expo/vector-icons';

<Feather name="hand" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Welcome Screen

---

#### Arrow Right Circle (Next/Continue)
```javascript
<Feather name="arrow-right-circle" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Onboarding navigation, Next buttons

---

#### Smartphone (Mobile/Device)
```javascript
<Feather name="smartphone" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Welcome Screen, Device info

---

#### Mail (Email)
```javascript
<Feather name="mail" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Login Screen, Register Screen (Email input)

---

#### Lock (Password)
```javascript
<Feather name="lock" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Login Screen, Register Screen (Password input)

---

#### User Plus (Register/Sign Up)
```javascript
<Feather name="user-plus" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Register Screen, Sign up button

---

#### Log In (Login/Sign In)
```javascript
<Feather name="log-in" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Login Screen, Sign in button

---

#### Eye (Show Password)
```javascript
<Feather name="eye" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Password input (show password)

---

#### Eye Off (Hide Password)
```javascript
<Feather name="eye-off" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Password input (hide password)

---

#### Key (Password/Security)
```javascript
<Feather name="key" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Forgot password, Security settings

---

### 2. Social Login Icons

**Not:** Feather'da sosyal medya ikonları yok. Bunlar için **FontAwesome** kullanacağız.

#### Google
```javascript
import { FontAwesome } from '@expo/vector-icons';

<FontAwesome name="google" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Social login buttons

---

#### Apple
```javascript
<FontAwesome name="apple" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Social login buttons

---

#### Facebook
```javascript
<FontAwesome name="facebook" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Social login buttons

---

### 3. Personal Info Icons

#### User (Name/Profile)
```javascript
<Feather name="user" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Personal Info Screen (Name, Surname inputs)

---

#### Calendar (Birth Date)
```javascript
<Feather name="calendar" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Personal Info Screen (Birth date picker)

---

#### Map Pin (Country/Location)
```javascript
<Feather name="map-pin" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Personal Info Screen (Country selector)

---

### 4. Physical Info Icons

**Not:** Feather'da "baby" ikonu yok. Alternatif kullanacağız.

#### Baby (Gender) - Alternatif: Users
```javascript
<Feather name="users" size={24} color="#2267f2" />
// veya
import { MaterialCommunityIcons } from '@expo/vector-icons';
<MaterialCommunityIcons name="human-male-female" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Personal Info Screen (Gender selector)

---

**Not:** Feather'da "scale" ikonu yok. MaterialCommunityIcons kullanacağız.

#### Scale (Weight)
```javascript
import { MaterialCommunityIcons } from '@expo/vector-icons';

<MaterialCommunityIcons name="scale-bathroom" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Physical Info Screen (Weight input)

---

**Not:** Feather'da "ruler" ikonu yok. MaterialCommunityIcons kullanacağız.

#### Ruler (Height)
```javascript
<MaterialCommunityIcons name="human-male-height" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Physical Info Screen (Height input)

---

### 5. Goal Setting Icons

#### Target (Goal/Objective)
```javascript
<Feather name="target" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Goal Setting Screen (Water goal)

---

#### Trophy (Achievement)
```javascript
<Feather name="award" size={24} color="#2267f2" />
// veya
import { MaterialCommunityIcons } from '@expo/vector-icons';
<MaterialCommunityIcons name="trophy" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Goal completion, Achievements

---

#### Flag (Milestone/Goal)
```javascript
<Feather name="flag" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Goal markers, Milestones

---

### 6. Navigation Icons

#### Home (Dashboard)
```javascript
<Feather name="home" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Bottom tab navigation (Dashboard)

---

#### History (Past Records)
```javascript
<Feather name="clock" size={24} color="#2267f2" />
// veya
<Feather name="activity" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Bottom tab navigation (History Screen)

---

#### User Circle (Profile)
```javascript
import { FontAwesome } from '@expo/vector-icons';

<FontAwesome name="user-circle" size={24} color="#2267f2" />
// veya Feather alternative
<Feather name="user" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Bottom tab navigation (Profile Screen)

---

#### Edit (Edit Profile)
```javascript
<Feather name="edit" size={24} color="#2267f2" />
// veya
<Feather name="edit-2" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Profile Screen (Edit button)

---

#### Settings (Settings/Preferences)
```javascript
<Feather name="settings" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Bottom tab navigation, Settings Screen

---

#### Log Out (Logout/Sign Out)
```javascript
<Feather name="log-out" size={24} color="#2267f2" />
```
**Kullanım Yeri:** Settings Screen, Profile Screen (Logout button)

---

## 📊 İkon Kullanım Tablosu

| İkon | Feather Name | Alternative | Kullanım Yeri |
|------|--------------|-------------|---------------|
| Hand | `hand` | - | Welcome Screen |
| Arrow Right Circle | `arrow-right-circle` | - | Navigation |
| Smartphone | `smartphone` | - | Welcome Screen |
| Mail | `mail` | - | Login/Register |
| Lock | `lock` | - | Password inputs |
| User Plus | `user-plus` | - | Register button |
| Log In | `log-in` | - | Login button |
| Eye | `eye` | - | Show password |
| Eye Off | `eye-off` | - | Hide password |
| Key | `key` | - | Security |
| Google | - | FontAwesome: `google` | Social login |
| Apple | - | FontAwesome: `apple` | Social login |
| Facebook | - | FontAwesome: `facebook` | Social login |
| User | `user` | - | Profile/Name |
| Calendar | `calendar` | - | Birth date |
| Map Pin | `map-pin` | - | Country |
| Baby/Gender | `users` | MaterialCommunityIcons: `human-male-female` | Gender |
| Scale | - | MaterialCommunityIcons: `scale-bathroom` | Weight |
| Ruler | - | MaterialCommunityIcons: `human-male-height` | Height |
| Target | `target` | - | Goals |
| Trophy | `award` | MaterialCommunityIcons: `trophy` | Achievement |
| Flag | `flag` | - | Milestones |
| Home | `home` | - | Dashboard tab |
| History | `clock` or `activity` | - | History tab |
| User Circle | `user` | FontAwesome: `user-circle` | Profile tab |
| Edit | `edit` or `edit-2` | - | Edit button |
| Settings | `settings` | - | Settings tab |
| Log Out | `log-out` | - | Logout button |

---

## 🎨 Kullanım Örnekleri

### Temel Kullanım

```javascript
import { Feather } from '@expo/vector-icons';

const MyComponent = () => {
  return (
    <Feather name="home" size={24} color="#2267f2" />
  );
};
```

### Input ile Kullanım

```javascript
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const EmailInput = () => {
  return (
    <View style={styles.inputContainer}>
      <Feather name="mail" size={20} color="#2267f2" />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
```

### Password Input ile Eye Toggle

```javascript
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Feather name="lock" size={20} color="#2267f2" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Feather 
          name={showPassword ? "eye" : "eye-off"} 
          size={20} 
          color="#2267f2" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
```

### Button ile Kullanım

```javascript
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const LoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Feather name="log-in" size={20} color="#fff" />
      <Text style={styles.buttonText}>Giriş Yap</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2267f2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### Tab Navigator ile Kullanım

```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'History') {
            iconName = 'clock';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2267f2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
```

---

## 🎨 İkon Boyutları

```javascript
// Küçük ikonlar (input içinde)
<Feather name="mail" size={20} color="#2267f2" />

// Orta ikonlar (butonlar, tab bar)
<Feather name="home" size={24} color="#2267f2" />

// Büyük ikonlar (başlıklar, welcome screen)
<Feather name="hand" size={48} color="#2267f2" />

// Çok büyük ikonlar (splash, onboarding)
<Feather name="smartphone" size={64} color="#2267f2" />
```

---

## 🎨 Renk Varyasyonları

```javascript
// Primary color
<Feather name="home" size={24} color="#2267f2" />

// Active state (daha koyu)
<Feather name="home" size={24} color="#1a52c2" />

// Inactive state (gri)
<Feather name="home" size={24} color="#999" />

// White (dark backgrounds)
<Feather name="home" size={24} color="#fff" />

// Black (light backgrounds)
<Feather name="home" size={24} color="#000" />
```

---

## 📦 Reusable Icon Component

```javascript
// src/components/common/Icon.js
import React from 'react';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#2267f2';

const Icon = ({ 
  name, 
  size = 24, 
  color = PRIMARY_COLOR, 
  family = 'Feather',
  style 
}) => {
  const IconComponent = {
    Feather,
    FontAwesome,
    MaterialCommunityIcons,
  }[family];

  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default Icon;

// Kullanım:
// <Icon name="home" size={24} />
// <Icon name="google" family="FontAwesome" />
// <Icon name="scale-bathroom" family="MaterialCommunityIcons" />
```

---

## 📋 Ekran Bazında İkon Kullanımı

### Welcome Screen
- `hand` (64px) - Greeting
- `smartphone` (48px) - App feature
- `arrow-right-circle` (24px) - Get started button

### Register Screen
- `user-plus` (48px) - Header
- `mail` (20px) - Email input
- `lock` (20px) - Password input
- `eye` / `eye-off` (20px) - Password toggle
- `google`, `apple`, `facebook` (24px) - Social login

### Login Screen
- `log-in` (48px) - Header
- `mail` (20px) - Email input
- `lock` (20px) - Password input
- `eye` / `eye-off` (20px) - Password toggle
- `key` (20px) - Forgot password link

### Personal Info Screen
- `user` (20px) - Name/Surname inputs
- `calendar` (20px) - Birth date picker
- `human-male-female` (20px) - Gender selector
- `map-pin` (20px) - Country selector

### Physical Info Screen
- `scale-bathroom` (20px) - Weight input
- `human-male-height` (20px) - Height input

### Goal Setting Screen
- `target` (48px) - Header
- `flag` (20px) - Water goal
- `trophy` (20px) - Achievement preview

### Dashboard Screen
- `home` (24px) - Tab icon
- `target` (20px) - Goal indicator
- `activity` (20px) - Progress chart

### History Screen
- `clock` (24px) - Tab icon
- `calendar` (20px) - Date selector
- `activity` (20px) - Statistics

### Profile Screen
- `user` (24px) - Tab icon
- `edit` (20px) - Edit button
- `settings` (20px) - Settings link

### Settings Screen
- `settings` (24px) - Tab icon
- `log-out` (20px) - Logout button

---

## ✅ Kurulum Özeti

```bash
# Zaten kurulu!
npm install @expo/vector-icons
```

### Import Statements

```javascript
// Feather Icons (Ana ikon seti)
import { Feather } from '@expo/vector-icons';

// FontAwesome (Sosyal medya ikonları)
import { FontAwesome } from '@expo/vector-icons';

// MaterialCommunityIcons (Özel ikonlar: scale, ruler, baby)
import { MaterialCommunityIcons } from '@expo/vector-icons';
```

---

## 🎯 Özet

✅ **@expo/vector-icons** kuruldu  
✅ **Feather** ana ikon seti olarak seçildi  
✅ **FontAwesome** sosyal medya ikonları için  
✅ **MaterialCommunityIcons** özel ikonlar için  
✅ **Primary Color**: `#2267f2`  
✅ **32 ikon** tanımlandı ve dokümante edildi  
✅ **Kullanım örnekleri** hazırlandı  
✅ **Reusable component** oluşturuldu  

Artık tüm ekranlarda ikonları kullanabilirsiniz! 🎨
