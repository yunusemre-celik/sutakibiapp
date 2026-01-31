import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import UnderwaterBackground from '../../components/common/UnderwaterBackground';
import Icon from '../../components/common/Icon';
import { Icons, IconSize, Colors } from '../../constants';

const { width } = Dimensions.get('window');

/**
 * Welcome Screen
 * 
 * İlk açılış ekranı - underwater tema ile
 */
const WelcomeScreen = ({ navigation }) => {
    return (
        <UnderwaterBackground blurAmount={5} overlayOpacity={0.2}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    {/* Logo/Icon */}
                    <View style={styles.header}>
                        <Icon
                            name={Icons.HAND.name}
                            family={Icons.HAND.family}
                            size={IconSize.XXXLARGE}
                            color={Colors.white}
                        />
                        <Text style={styles.title}>Su Takibi</Text>
                        <Text style={styles.subtitle}>
                            Günlük su tüketimini kolayca takip et
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={styles.features}>
                        <View style={styles.feature}>
                            <View style={styles.featureIcon}>
                                <Icon
                                    name={Icons.TARGET.name}
                                    family={Icons.TARGET.family}
                                    size={IconSize.XLARGE}
                                    color={Colors.white}
                                />
                            </View>
                            <Text style={styles.featureText}>Hedef Belirle</Text>
                            <Text style={styles.featureSubtext}>
                                Kişiselleştirilmiş su hedefi
                            </Text>
                        </View>

                        <View style={styles.feature}>
                            <View style={styles.featureIcon}>
                                <Icon
                                    name={Icons.ACTIVITY.name}
                                    family={Icons.ACTIVITY.family}
                                    size={IconSize.XLARGE}
                                    color={Colors.white}
                                />
                            </View>
                            <Text style={styles.featureText}>İlerleme Takibi</Text>
                            <Text style={styles.featureSubtext}>
                                Günlük ve haftalık raporlar
                            </Text>
                        </View>

                        <View style={styles.feature}>
                            <View style={styles.featureIcon}>
                                <Icon
                                    name={Icons.BELL.name}
                                    family={Icons.BELL.family}
                                    size={IconSize.XLARGE}
                                    color={Colors.white}
                                />
                            </View>
                            <Text style={styles.featureText}>Hatırlatıcılar</Text>
                            <Text style={styles.featureSubtext}>
                                Düzenli su içme bildirimleri
                            </Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={styles.primaryButtonText}>Başla</Text>
                            <Icon
                                name={Icons.ARROW_RIGHT_CIRCLE.name}
                                family={Icons.ARROW_RIGHT_CIRCLE.family}
                                size={IconSize.MEDIUM}
                                color={Colors.white}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.secondaryButtonText}>Giriş Yap</Text>
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
        paddingVertical: 60,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.white,
        marginTop: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
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
        width: width / 3 - 32,
    },
    featureIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 8,
        textAlign: 'center',
    },
    featureSubtext: {
        color: Colors.white,
        fontSize: 12,
        opacity: 0.8,
        marginTop: 4,
        textAlign: 'center',
    },
    buttons: {
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
});

export default WelcomeScreen;
