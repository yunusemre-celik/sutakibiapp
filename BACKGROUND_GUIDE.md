# 🌊 Underwater Background Kılavuzu

## 📦 Kurulum

### 1. Gerekli Kütüphane
```bash
npm install @react-native-community/blur
```
✅ **Kurulum tamamlandı!**

### 2. Arka Plan Görseli
✅ **underwater-bg.png** assets klasörüne eklendi

---

## 🎨 Component Özellikleri

### UnderwaterBackground Component

Reusable arka plan bileşeni - su altı teması, blur efekti ve overlay ile.

#### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|-----------|----------|
| `children` | ReactNode | - | İçerik |
| `blurAmount` | number | 10 | Blur miktarı (0-100) |
| `blurType` | string | 'light' | Blur tipi: 'light', 'dark', 'xlight' |
| `overlayOpacity` | number | 0.3 | Overlay opaklığı (0-1) |
| `overlayColor` | string | 'black' | Overlay rengi: 'black', 'white' |
| `showBlur` | boolean | true | Blur göster/gizle |
| `showOverlay` | boolean | true | Overlay göster/gizle |
| `style` | object | - | Ek stil |

---

## 🚀 Kullanım Örnekleri

### Temel Kullanım

```javascript
import UnderwaterBackground from './src/components/common/UnderwaterBackground';

const MyScreen = () => {
  return (
    <UnderwaterBackground>
      <View>
        <Text>İçerik buraya gelecek</Text>
      </View>
    </UnderwaterBackground>
  );
};
```

---

### Login Screen

```javascript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import UnderwaterBackground from './src/components/common/UnderwaterBackground';
import Icon from './src/components/common/Icon';
import { Icons, IconSize, Colors } from './src/constants';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <UnderwaterBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Icon
              name={Icons.LOG_IN.name}
              family={Icons.LOG_IN.family}
              size={IconSize.XXXLARGE}
              color={Colors.white}
            />
            <Text style={styles.title}>Giriş Yap</Text>
            <Text style={styles.subtitle}>Su takip yolculuğuna devam et</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Icon
                name={Icons.MAIL.name}
                family={Icons.MAIL.family}
                size={IconSize.MEDIUM}
                color={Colors.primary}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.gray400}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Icon
                name={Icons.LOCK.name}
                family={Icons.LOCK.family}
                size={IconSize.MEDIUM}
                color={Colors.primary}
              />
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor={Colors.gray400}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? Icons.EYE.name : Icons.EYE_OFF.name}
                  family={Icons.EYE.family}
                  size={IconSize.MEDIUM}
                  color={Colors.gray500}
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Hesabın yok mu?</Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </UnderwaterBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    marginTop: 8,
    opacity: 0.9,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: Colors.white,
    fontSize: 14,
  },
  footerLink: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
```

---

### Register Screen

```javascript
<UnderwaterBackground blurAmount={15} overlayOpacity={0.4}>
  {/* Register form içeriği */}
</UnderwaterBackground>
```

---

### Welcome Screen

```javascript
<UnderwaterBackground blurAmount={5} overlayOpacity={0.2}>
  {/* Welcome screen içeriği */}
</UnderwaterBackground>
```

---

## 🎨 Blur Ayarları

### Light Blur (Varsayılan)
```javascript
<UnderwaterBackground blurType="light" blurAmount={10}>
  {/* İçerik */}
</UnderwaterBackground>
```

### Dark Blur
```javascript
<UnderwaterBackground blurType="dark" blurAmount={15}>
  {/* İçerik */}
</UnderwaterBackground>
```

### Extra Light Blur
```javascript
<UnderwaterBackground blurType="xlight" blurAmount={5}>
  {/* İçerik */}
</UnderwaterBackground>
```

---

## 🎨 Overlay Ayarları

### Koyu Overlay
```javascript
<UnderwaterBackground 
  overlayColor="black" 
  overlayOpacity={0.5}
>
  {/* İçerik */}
</UnderwaterBackground>
```

### Açık Overlay
```javascript
<UnderwaterBackground 
  overlayColor="white" 
  overlayOpacity={0.3}
>
  {/* İçerik */}
</UnderwaterBackground>
```

### Overlay Olmadan
```javascript
<UnderwaterBackground showOverlay={false}>
  {/* İçerik */}
</UnderwaterBackground>
```

---

## 🎨 Özel Kombinasyonlar

### Yoğun Blur + Koyu Overlay
```javascript
<UnderwaterBackground 
  blurAmount={20}
  blurType="dark"
  overlayOpacity={0.6}
  overlayColor="black"
>
  {/* Çok net içerik için */}
</UnderwaterBackground>
```

### Hafif Blur + Hafif Overlay
```javascript
<UnderwaterBackground 
  blurAmount={5}
  blurType="light"
  overlayOpacity={0.2}
  overlayColor="white"
>
  {/* Arka planın daha görünür olması için */}
</UnderwaterBackground>
```

### Sadece Blur (Overlay Yok)
```javascript
<UnderwaterBackground 
  blurAmount={15}
  showOverlay={false}
>
  {/* Sadece blur efekti */}
</UnderwaterBackground>
```

### Sadece Overlay (Blur Yok)
```javascript
<UnderwaterBackground 
  showBlur={false}
  overlayOpacity={0.5}
>
  {/* Sadece overlay */}
</UnderwaterBackground>
```

---

## 📱 Ekran Önerileri

### Welcome Screen
- **blurAmount**: 5-10
- **overlayOpacity**: 0.2-0.3
- **Neden**: Arka planın görünür olması önemli

### Login/Register Screens
- **blurAmount**: 10-15
- **overlayOpacity**: 0.3-0.4
- **Neden**: Form elemanlarının net görünmesi önemli

### Onboarding Screens
- **blurAmount**: 8-12
- **overlayOpacity**: 0.25-0.35
- **Neden**: Hem arka plan hem içerik dengeli olmalı

---

## 🎨 Tasarım İpuçları

### 1. İçerik Okunabilirliği
```javascript
// Form elemanları için beyaz arka plan kullanın
<View style={{
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: 12,
  padding: 16,
}}>
  {/* Form içeriği */}
</View>
```

### 2. Başlıklar için Kontrast
```javascript
// Beyaz metin + shadow
<Text style={{
  color: 'white',
  fontSize: 32,
  fontWeight: 'bold',
  textShadowColor: 'rgba(0, 0, 0, 0.3)',
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 4,
}}>
  Başlık
</Text>
```

### 3. Butonlar için Görünürlük
```javascript
// Primary button - solid background
<TouchableOpacity style={{
  backgroundColor: Colors.primary,
  borderRadius: 12,
  paddingVertical: 16,
}}>
  <Text style={{ color: 'white' }}>Buton</Text>
</TouchableOpacity>

// Secondary button - transparent with border
<TouchableOpacity style={{
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: 12,
  paddingVertical: 16,
  borderWidth: 2,
  borderColor: 'white',
}}>
  <Text style={{ color: 'white' }}>Buton</Text>
</TouchableOpacity>
```

---

## 📁 Dosya Yapısı

```
sutakibiapp/
├── assets/
│   └── underwater-bg.png          # Arka plan görseli
├── src/
│   ├── components/
│   │   └── common/
│   │       └── UnderwaterBackground.js  # Component
│   └── examples/
│       └── BackgroundExamples.js   # Kullanım örnekleri
```

---

## ✅ Kontrol Listesi

- [x] @react-native-community/blur kuruldu
- [x] underwater-bg.png eklendi
- [x] UnderwaterBackground component oluşturuldu
- [x] Kullanım örnekleri hazırlandı
- [x] Dokümantasyon tamamlandı

---

## 🎯 Kullanım Senaryoları

| Ekran | blurAmount | overlayOpacity | Neden |
|-------|-----------|----------------|-------|
| Welcome | 5-10 | 0.2-0.3 | Arka plan görünür olmalı |
| Login | 10-15 | 0.3-0.4 | Form net görünmeli |
| Register | 10-15 | 0.3-0.4 | Form net görünmeli |
| Onboarding | 8-12 | 0.25-0.35 | Dengeli görünüm |

---

## 💡 İpuçları

1. **Blur Miktarı**: Daha fazla blur = daha net içerik arka planı
2. **Overlay Opaklığı**: Daha yüksek opacity = daha koyu arka plan
3. **Performans**: Blur efekti performansı etkileyebilir, gerektiğinde `showBlur={false}` kullanın
4. **Test**: Farklı cihazlarda test edin, blur efekti cihaza göre değişebilir

---

## 🚀 Artık Hazırsınız!

UnderwaterBackground component'i kullanarak güzel, modern ve profesyonel görünümlü ekranlar oluşturabilirsiniz! 🌊
