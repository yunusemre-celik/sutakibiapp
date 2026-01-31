import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Switch,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../../components/common/Icon';
import { Icons, IconSize, Colors } from '../../constants';
import { signOut } from '../../redux/slices/authSlice';

/**
 * Settings Screen
 * 
 * Ayarlar ekranı - su teması ile
 */
const SettingsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.user);

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Çıkış yapmak istediğinize emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Çıkış Yap',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await dispatch(signOut()).unwrap();
                        } catch (error) {
                            Alert.alert('Hata', 'Çıkış yapılamadı');
                        }
                    },
                },
            ]
        );
    };

    const SettingItem = ({ icon, title, subtitle, onPress, rightElement }) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.settingLeft}>
                <View style={styles.iconContainer}>
                    <Icon
                        name={icon.name}
                        family={icon.family}
                        size={IconSize.MEDIUM}
                        color={Colors.primary}
                    />
                </View>
                <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            {rightElement || (
                <Icon
                    name={Icons.ARROW_RIGHT.name}
                    family={Icons.ARROW_RIGHT.family}
                    size={IconSize.MEDIUM}
                    color={Colors.gray400}
                />
            )}
        </TouchableOpacity>
    );

    const SettingSection = ({ title, children }) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionContent}>{children}</View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name={Icons.ARROW_LEFT.name}
                        family={Icons.ARROW_LEFT.family}
                        size={IconSize.LARGE}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ayarlar</Text>
                <View style={styles.backButton} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <SettingSection title="Profil">
                    <SettingItem
                        icon={Icons.USER}
                        title="Kişisel Bilgiler"
                        subtitle={profile?.name || 'Bilgileri düzenle'}
                        onPress={() => navigation.navigate('PersonalInfo')}
                    />
                    <SettingItem
                        icon={Icons.ACTIVITY}
                        title="Fiziksel Bilgiler"
                        subtitle={`${profile?.weight || '-'} kg, ${profile?.height || '-'} cm`}
                        onPress={() => navigation.navigate('PhysicalInfo')}
                    />
                    <SettingItem
                        icon={Icons.TARGET}
                        title="Su Hedefi"
                        subtitle={`${profile?.water_goal || 2.5}L / gün`}
                        onPress={() => navigation.navigate('GoalSetting')}
                    />
                </SettingSection>

                {/* Notifications Section */}
                <SettingSection title="Bildirimler">
                    <SettingItem
                        icon={Icons.BELL}
                        title="Bildirimler"
                        subtitle="Su içme hatırlatıcıları"
                        rightElement={
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: Colors.gray300, true: Colors.primary }}
                                thumbColor={Colors.white}
                            />
                        }
                    />
                    <SettingItem
                        icon={Icons.VOLUME}
                        title="Ses"
                        subtitle="Bildirim sesleri"
                        rightElement={
                            <Switch
                                value={soundEnabled}
                                onValueChange={setSoundEnabled}
                                trackColor={{ false: Colors.gray300, true: Colors.primary }}
                                thumbColor={Colors.white}
                            />
                        }
                    />
                </SettingSection>

                {/* App Section */}
                <SettingSection title="Uygulama">
                    <SettingItem
                        icon={Icons.INFO}
                        title="Hakkında"
                        subtitle="Versiyon 1.0.0"
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon={Icons.SHIELD}
                        title="Gizlilik Politikası"
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon={Icons.FILE_TEXT}
                        title="Kullanım Şartları"
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon={Icons.HELP_CIRCLE}
                        title="Yardım & Destek"
                        onPress={() => { }}
                    />
                </SettingSection>

                {/* Danger Zone */}
                <View style={styles.dangerZone}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Icon
                            name={Icons.LOG_OUT.name}
                            family={Icons.LOG_OUT.family}
                            size={IconSize.MEDIUM}
                            color={Colors.error}
                        />
                        <Text style={styles.logoutText}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.gray100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginLeft: 20,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    sectionContent: {
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.border,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.gray100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    settingSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    dangerZone: {
        marginTop: 24,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: Colors.error,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.error,
    },
});

export default SettingsScreen;
