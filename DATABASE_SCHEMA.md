# Supabase Database Schema

Bu dosya, Supabase'de oluşturulması gereken tabloları ve yapılandırmaları içerir.

## 1. user_profiles Tablosu

```sql
-- User profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  weight DECIMAL(5,2) NOT NULL, -- in kg
  height DECIMAL(5,2) NOT NULL, -- in cm
  country VARCHAR(100) NOT NULL,
  thermos DECIMAL(5,3) DEFAULT 0.5, -- in liters
  water_goal DECIMAL(5,3) DEFAULT 2.0, -- in liters
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

## 2. water_logs Tablosu

```sql
-- Water intake logs table
CREATE TABLE water_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  container_id VARCHAR(50) NOT NULL,
  volume DECIMAL(5,3) NOT NULL, -- in liters
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE water_logs ENABLE ROW LEVEL SECURITY;

-- Policies for water_logs
CREATE POLICY "Users can view their own logs"
  ON water_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own logs"
  ON water_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own logs"
  ON water_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for faster queries
CREATE INDEX idx_water_logs_user_id ON water_logs(user_id);
CREATE INDEX idx_water_logs_logged_at ON water_logs(logged_at);
CREATE INDEX idx_water_logs_user_logged ON water_logs(user_id, logged_at);
```

## 3. notification_settings Tablosu (Opsiyonel)

```sql
-- Notification settings table
CREATE TABLE notification_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT true,
  start_time TIME DEFAULT '08:00:00',
  end_time TIME DEFAULT '20:00:00',
  interval_hours INTEGER DEFAULT 2,
  expo_push_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

-- Policies for notification_settings
CREATE POLICY "Users can view their own notification settings"
  ON notification_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notification settings"
  ON notification_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification settings"
  ON notification_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_notification_settings_user_id ON notification_settings(user_id);
```

## Kurulum Adımları

1. Supabase Dashboard'a gidin (https://app.supabase.com)
2. Projenizi seçin
3. Sol menüden "SQL Editor" sekmesine tıklayın
4. Yukarıdaki SQL komutlarını sırayla çalıştırın
5. "Authentication" sekmesinden Email/Password authentication'ı etkinleştirin

## Environment Variables

`.env` dosyası oluşturun ve aşağıdaki bilgileri ekleyin:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Bu bilgileri Supabase Dashboard > Settings > API'den alabilirsiniz.
