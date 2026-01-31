/**
 * Icon Usage Examples
 * 
 * Bu dosya Icon component'inin nasıl kullanılacağını gösterir.
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from '../components/common/Icon';
import { Icons, IconSize, IconColor, Colors } from '../constants';

// ============================================
// EXAMPLE 1: Basic Icon Usage
// ============================================
export const BasicIconExample = () => {
    return (
        <View style={styles.container}>
            {/* Using Icon component directly */}
            <Icon name="home" size={24} color="#2267f2" />

            {/* Using Icon component with constants */}
            <Icon
                name={Icons.HOME.name}
                family={Icons.HOME.family}
                size={IconSize.LARGE}
                color={IconColor.PRIMARY}
            />
        </View>
    );
};

// ============================================
// EXAMPLE 2: Email Input with Icon
// ============================================
export const EmailInputExample = () => {
    const [email, setEmail] = useState('');

    return (
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
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
        </View>
    );
};

// ============================================
// EXAMPLE 3: Password Input with Eye Toggle
// ============================================
export const PasswordInputExample = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.inputContainer}>
            <Icon
                name={Icons.LOCK.name}
                family={Icons.LOCK.family}
                size={IconSize.MEDIUM}
                color={Colors.primary}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
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
    );
};

// ============================================
// EXAMPLE 4: Login Button with Icon
// ============================================
export const LoginButtonExample = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon
                name={Icons.LOG_IN.name}
                family={Icons.LOG_IN.family}
                size={IconSize.MEDIUM}
                color={Colors.white}
            />
            <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
    );
};

// ============================================
// EXAMPLE 5: Social Login Buttons
// ============================================
export const SocialLoginButtons = () => {
    return (
        <View style={styles.socialContainer}>
            {/* Google */}
            <TouchableOpacity style={styles.socialButton}>
                <Icon
                    name={Icons.GOOGLE.name}
                    family={Icons.GOOGLE.family}
                    size={IconSize.LARGE}
                    color={Colors.primary}
                />
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity style={styles.socialButton}>
                <Icon
                    name={Icons.APPLE.name}
                    family={Icons.APPLE.family}
                    size={IconSize.LARGE}
                    color={Colors.primary}
                />
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity style={styles.socialButton}>
                <Icon
                    name={Icons.FACEBOOK.name}
                    family={Icons.FACEBOOK.family}
                    size={IconSize.LARGE}
                    color={Colors.primary}
                />
            </TouchableOpacity>
        </View>
    );
};

// ============================================
// EXAMPLE 6: Personal Info Form
// ============================================
export const PersonalInfoFormExample = () => {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [country, setCountry] = useState('');

    return (
        <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
                <Icon
                    name={Icons.USER.name}
                    family={Icons.USER.family}
                    size={IconSize.MEDIUM}
                    color={Colors.primary}
                />
                <TextInput
                    style={styles.input}
                    placeholder="İsim"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Birth Date Input */}
            <View style={styles.inputContainer}>
                <Icon
                    name={Icons.CALENDAR.name}
                    family={Icons.CALENDAR.family}
                    size={IconSize.MEDIUM}
                    color={Colors.primary}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Doğum Tarihi"
                    value={birthDate}
                    onChangeText={setBirthDate}
                />
            </View>

            {/* Country Input */}
            <View style={styles.inputContainer}>
                <Icon
                    name={Icons.MAP_PIN.name}
                    family={Icons.MAP_PIN.family}
                    size={IconSize.MEDIUM}
                    color={Colors.primary}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ülke"
                    value={country}
                    onChangeText={setCountry}
                />
            </View>
        </View>
    );
};

// ============================================
// EXAMPLE 7: Physical Info Form
// ============================================
export const PhysicalInfoFormExample = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    return (
        <View style={styles.formContainer}>
            {/* Weight Input */}
            <View style={styles.inputContainer}>
                <Icon
                    name={Icons.SCALE.name}
                    family={Icons.SCALE.family}
                    size={IconSize.MEDIUM}
                    color={Colors.primary}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Kilo (kg)"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />
            </View>

            {/* Height Input */}
            <View style={styles.inputContainer}>
                <Icon
                    name={Icons.RULER.name}
                    family={Icons.RULER.family}
                    size={IconSize.MEDIUM}
                    color={Colors.primary}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Boy (cm)"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />
            </View>
        </View>
    );
};

// ============================================
// EXAMPLE 8: Goal Setting Form
// ============================================
export const GoalSettingFormExample = () => {
    const [waterGoal, setWaterGoal] = useState('');

    return (
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Icon
                    name={Icons.TARGET.name}
                    family={Icons.TARGET.family}
                    size={IconSize.MEDIUM}
                    color={Colors.primary}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Günlük Su Hedefi (L)"
                    value={waterGoal}
                    onChangeText={setWaterGoal}
                    keyboardType="numeric"
                />
            </View>
        </View>
    );
};

// ============================================
// EXAMPLE 9: Navigation Icons
// ============================================
export const NavigationIconsExample = () => {
    return (
        <View style={styles.navContainer}>
            <View style={styles.navItem}>
                <Icon
                    name={Icons.HOME.name}
                    family={Icons.HOME.family}
                    size={IconSize.LARGE}
                    color={Colors.primary}
                />
                <Text style={styles.navText}>Ana Sayfa</Text>
            </View>

            <View style={styles.navItem}>
                <Icon
                    name={Icons.HISTORY.name}
                    family={Icons.HISTORY.family}
                    size={IconSize.LARGE}
                    color={Colors.gray500}
                />
                <Text style={styles.navText}>Geçmiş</Text>
            </View>

            <View style={styles.navItem}>
                <Icon
                    name={Icons.USER.name}
                    family={Icons.USER.family}
                    size={IconSize.LARGE}
                    color={Colors.gray500}
                />
                <Text style={styles.navText}>Profil</Text>
            </View>

            <View style={styles.navItem}>
                <Icon
                    name={Icons.SETTINGS.name}
                    family={Icons.SETTINGS.family}
                    size={IconSize.LARGE}
                    color={Colors.gray500}
                />
                <Text style={styles.navText}>Ayarlar</Text>
            </View>
        </View>
    );
};

// ============================================
// EXAMPLE 10: Settings Screen Items
// ============================================
export const SettingsItemsExample = () => {
    return (
        <View style={styles.settingsContainer}>
            {/* Edit Profile */}
            <TouchableOpacity style={styles.settingsItem}>
                <Icon
                    name={Icons.EDIT.name}
                    family={Icons.EDIT.family}
                    size={IconSize.MEDIUM}
                    color={Colors.primary}
                />
                <Text style={styles.settingsText}>Profili Düzenle</Text>
                <Icon
                    name={Icons.CHEVRON_RIGHT.name}
                    family={Icons.CHEVRON_RIGHT.family}
                    size={IconSize.MEDIUM}
                    color={Colors.gray400}
                />
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity style={styles.settingsItem}>
                <Icon
                    name={Icons.LOG_OUT.name}
                    family={Icons.LOG_OUT.family}
                    size={IconSize.MEDIUM}
                    color={Colors.error}
                />
                <Text style={[styles.settingsText, { color: Colors.error }]}>Çıkış Yap</Text>
            </TouchableOpacity>
        </View>
    );
};

// ============================================
// Styles
// ============================================
const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: Colors.textPrimary,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        gap: 8,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginVertical: 20,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.gray100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        padding: 16,
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: Colors.textSecondary,
    },
    settingsContainer: {
        padding: 16,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    settingsText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: Colors.textPrimary,
    },
});
