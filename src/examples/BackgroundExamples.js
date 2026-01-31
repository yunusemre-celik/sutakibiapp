/**
 * Underwater Background Usage Examples
 * 
 * UnderwaterBackground component'inin nasıl kullanılacağını gösterir.
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import UnderwaterBackground from '../components/common/UnderwaterBackground';
import Icon from '../components/common/Icon';
import { Icons, IconSize, Colors } from '../constants';

// ============================================
// EXAMPLE 1: Basic Login Screen
// ============================================
export const LoginScreenExample = () => {
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

                        {/* Forgot Password */}
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
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

// ============================================
// EXAMPLE 2: Register Screen
// ============================================
export const RegisterScreenExample = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <UnderwaterBackground blurAmount={15} overlayOpacity={0.4}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Icon
                            name={Icons.USER_PLUS.name}
                            family={Icons.USER_PLUS.family}
                            size={IconSize.XXXLARGE}
                            color={Colors.white}
                        />
                        <Text style={styles.title}>Kayıt Ol</Text>
                        <Text style={styles.subtitle}>Su takip yolculuğuna başla</Text>
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

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <Icon
                                name={Icons.KEY.name}
                                family={Icons.KEY.family}
                                size={IconSize.MEDIUM}
                                color={Colors.primary}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Şifre Tekrar"
                                placeholderTextColor={Colors.gray400}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Icon
                                    name={
                                        showConfirmPassword ? Icons.EYE.name : Icons.EYE_OFF.name
                                    }
                                    family={Icons.EYE.family}
                                    size={IconSize.MEDIUM}
                                    color={Colors.gray500}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Kayıt Ol</Text>
                        </TouchableOpacity>

                        {/* Social Login */}
                        <View style={styles.socialContainer}>
                            <Text style={styles.socialText}>veya</Text>
                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Icon
                                        name={Icons.GOOGLE.name}
                                        family={Icons.GOOGLE.family}
                                        size={IconSize.LARGE}
                                        color={Colors.primary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Icon
                                        name={Icons.APPLE.name}
                                        family={Icons.APPLE.family}
                                        size={IconSize.LARGE}
                                        color={Colors.primary}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Icon
                                        name={Icons.FACEBOOK.name}
                                        family={Icons.FACEBOOK.family}
                                        size={IconSize.LARGE}
                                        color={Colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Hesabın var mı?</Text>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Giriş Yap</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </UnderwaterBackground>
    );
};

// ============================================
// EXAMPLE 3: Welcome Screen
// ============================================
export const WelcomeScreenExample = () => {
    return (
        <UnderwaterBackground blurAmount={5} overlayOpacity={0.2}>
            <SafeAreaView style={styles.container}>
                <View style={styles.welcomeContent}>
                    {/* Logo/Icon */}
                    <View style={styles.welcomeHeader}>
                        <Icon
                            name={Icons.HAND.name}
                            family={Icons.HAND.family}
                            size={IconSize.XXXLARGE}
                            color={Colors.white}
                        />
                        <Text style={styles.welcomeTitle}>Su Takibi</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Günlük su tüketimini kolayca takip et
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={styles.features}>
                        <View style={styles.feature}>
                            <Icon
                                name={Icons.TARGET.name}
                                family={Icons.TARGET.family}
                                size={IconSize.XLARGE}
                                color={Colors.white}
                            />
                            <Text style={styles.featureText}>Hedef Belirle</Text>
                        </View>
                        <View style={styles.feature}>
                            <Icon
                                name={Icons.ACTIVITY.name}
                                family={Icons.ACTIVITY.family}
                                size={IconSize.XLARGE}
                                color={Colors.white}
                            />
                            <Text style={styles.featureText}>İlerleme Takibi</Text>
                        </View>
                        <View style={styles.feature}>
                            <Icon
                                name={Icons.TROPHY.name}
                                family={Icons.TROPHY.family}
                                size={IconSize.XLARGE}
                                color={Colors.white}
                            />
                            <Text style={styles.featureText}>Başarılar Kazan</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.welcomeButtons}>
                        <TouchableOpacity style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>Başla</Text>
                            <Icon
                                name={Icons.ARROW_RIGHT_CIRCLE.name}
                                family={Icons.ARROW_RIGHT_CIRCLE.family}
                                size={IconSize.MEDIUM}
                                color={Colors.white}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Giriş Yap</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </UnderwaterBackground>
    );
};

// ============================================
// EXAMPLE 4: Custom Blur Settings
// ============================================
export const CustomBlurExample = () => {
    return (
        <UnderwaterBackground
            blurAmount={20}
            blurType="dark"
            overlayOpacity={0.5}
            overlayColor="black"
        >
            <View style={styles.customContent}>
                <Text style={styles.customText}>Özel Blur Ayarları</Text>
                <Text style={styles.customSubtext}>
                    blurAmount: 20, blurType: dark, overlayOpacity: 0.5
                </Text>
            </View>
        </UnderwaterBackground>
    );
};

// ============================================
// EXAMPLE 5: No Blur, Only Overlay
// ============================================
export const NoBlurExample = () => {
    return (
        <UnderwaterBackground showBlur={false} overlayOpacity={0.6}>
            <View style={styles.customContent}>
                <Text style={styles.customText}>Blur Yok, Sadece Overlay</Text>
                <Text style={styles.customSubtext}>showBlur: false</Text>
            </View>
        </UnderwaterBackground>
    );
};

// ============================================
// Styles
// ============================================
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
        maxWidth: 400,
        width: '100%',
        alignSelf: 'center',
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
    forgotPassword: {
        alignItems: 'center',
        marginTop: 16,
    },
    forgotPasswordText: {
        color: Colors.white,
        fontSize: 14,
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
    socialContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    socialText: {
        color: Colors.white,
        fontSize: 14,
        marginBottom: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 16,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeContent: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 60,
    },
    welcomeHeader: {
        alignItems: 'center',
        marginTop: 40,
    },
    welcomeTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.white,
        marginTop: 24,
    },
    welcomeSubtitle: {
        fontSize: 18,
        color: Colors.white,
        marginTop: 12,
        opacity: 0.9,
        textAlign: 'center',
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 40,
    },
    feature: {
        alignItems: 'center',
    },
    featureText: {
        color: Colors.white,
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    welcomeButtons: {
        gap: 16,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    primaryButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    secondaryButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
    customContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    customText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center',
    },
    customSubtext: {
        fontSize: 16,
        color: Colors.white,
        marginTop: 8,
        opacity: 0.8,
        textAlign: 'center',
    },
});
