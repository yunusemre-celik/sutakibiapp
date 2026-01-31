import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import UnderwaterBackground from '../../components/common/UnderwaterBackground';
import Icon from '../../components/common/Icon';
import { Icons, IconSize, Colors } from '../../constants';
import { signUp } from '../../redux/slices/authSlice';

/**
 * Register Screen
 * 
 * Kullanıcı kayıt ekranı - underwater tema ile
 */
const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleRegister = async () => {
        // Validation
        if (!email || !password || !confirmPassword) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Hata', 'Geçerli bir email adresi girin');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Hata', 'Şifreler eşleşmiyor');
            return;
        }

        try {
            await dispatch(signUp({ email, password })).unwrap();
            Alert.alert(
                'Başarılı',
                'Kayıt başarılı! Lütfen email adresinizi doğrulayın.',
                [{ text: 'Tamam', onPress: () => navigation.navigate('Login') }]
            );
        } catch (err) {
            Alert.alert('Kayıt Hatası', err || 'Kayıt oluşturulamadı');
        }
    };

    return (
        <UnderwaterBackground blurAmount={15} overlayOpacity={0.4}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
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
                                        autoCorrect={false}
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
                                        placeholder="Şifre (min. 6 karakter)"
                                        placeholderTextColor={Colors.gray400}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
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
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <Icon
                                            name={showConfirmPassword ? Icons.EYE.name : Icons.EYE_OFF.name}
                                            family={Icons.EYE.family}
                                            size={IconSize.MEDIUM}
                                            color={Colors.gray500}
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Register Button */}
                                <TouchableOpacity
                                    style={[styles.button, loading && styles.buttonDisabled]}
                                    onPress={handleRegister}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator color={Colors.white} />
                                    ) : (
                                        <Text style={styles.buttonText}>Kayıt Ol</Text>
                                    )}
                                </TouchableOpacity>

                                {/* Terms */}
                                <Text style={styles.termsText}>
                                    Kayıt olarak{' '}
                                    <Text style={styles.termsLink}>Kullanım Şartları</Text> ve{' '}
                                    <Text style={styles.termsLink}>Gizlilik Politikası</Text>'nı kabul
                                    etmiş olursunuz
                                </Text>
                            </View>

                            {/* Footer */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Hesabın var mı?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.footerLink}>Giriş Yap</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </UnderwaterBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 40,
        minHeight: 600,
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.white,
        marginTop: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.white,
        marginTop: 8,
        opacity: 0.9,
        textAlign: 'center',
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
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
    termsText: {
        marginTop: 16,
        fontSize: 12,
        color: Colors.white,
        textAlign: 'center',
        opacity: 0.8,
    },
    termsLink: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginTop: 20,
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

export default RegisterScreen;
