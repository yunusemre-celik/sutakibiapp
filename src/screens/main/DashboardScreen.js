import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../../components/common/Icon';
import WaterGlass from '../../components/water/WaterGlass';
import HistoryItem from '../../components/water/HistoryItem';
import QuickAddButton from '../../components/water/QuickAddButton';
import { Icons, IconSize, Colors } from '../../constants';
import {
    logWaterIntake,
    fetchTodayWaterLogs,
    fetchDailySummaries,
} from '../../redux/slices/waterSlice';

/**
 * Dashboard Screen
 * 
 * Ana ekran - günlük su tüketimi takibi ve geçmiş kayıtlar
 * Redux ve Supabase ile entegre
 */
const DashboardScreen = ({ navigation }) => {
    // Redux state
    const dispatch = useDispatch();
    const { todayTotal, dailySummaries, loading } = useSelector((state) => state.water);
    const { profile } = useSelector((state) => state.user);
    const waterGoal = profile?.water_goal || 2.5;

    // Local state
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // Calculate percentage
    const percentage = (todayTotal / waterGoal) * 100;

    // Quick add amounts (in liters)
    const quickAddAmounts = [
        { amount: 0.25, label: '250ml' },
        { amount: 0.5, label: '500ml' },
        { amount: 1.0, label: '1L' },
        { amount: 1.5, label: '1.5L' },
    ];

    // Fetch data on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            await Promise.all([
                dispatch(fetchTodayWaterLogs()).unwrap(),
                dispatch(fetchDailySummaries(7)).unwrap(),
            ]);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    // Handle refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    // Handle quick add
    const handleQuickAdd = async (amount) => {
        setSelectedAmount(amount);

        try {
            await dispatch(
                logWaterIntake({
                    containerId: `quick-add-${amount * 1000}ml`,
                    volume: amount,
                })
            ).unwrap();

            // Refresh daily summaries after adding
            await dispatch(fetchDailySummaries(7)).unwrap();
        } catch (error) {
            console.error('Error adding water:', error);
        }

        // Reset selection after animation
        setTimeout(() => setSelectedAmount(null), 300);
    };

    // Format date for history items
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Reset time for comparison
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

        if (dateOnly.getTime() === todayOnly.getTime()) {
            return 'Bugün';
        } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
            return 'Dün';
        } else {
            const options = { day: 'numeric', month: 'long' };
            return date.toLocaleDateString('tr-TR', options);
        }
    };

    // Filter out today from history (it's shown in the glass)
    const historyData = dailySummaries.filter((summary) => {
        const summaryDate = new Date(summary.date);
        const today = new Date();
        summaryDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return summaryDate.getTime() !== today.getTime();
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Icon
                        name={Icons.USER.name}
                        family={Icons.USER.family}
                        size={IconSize.LARGE}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Su Takibi</Text>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Icon
                        name={Icons.SETTINGS.name}
                        family={Icons.SETTINGS.family}
                        size={IconSize.LARGE}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Water Glass */}
                <View style={styles.glassContainer}>
                    <WaterGlass
                        currentAmount={todayTotal}
                        goalAmount={waterGoal}
                        percentage={percentage}
                        height={300}
                        width={200}
                    />
                </View>

                {/* Quick Add Buttons */}
                <View style={styles.quickAddContainer}>
                    <Text style={styles.sectionTitle}>Hızlı Ekle</Text>
                    <View style={styles.quickAddButtons}>
                        {quickAddAmounts.map((item, index) => (
                            <QuickAddButton
                                key={index}
                                amount={item.amount}
                                label={item.label}
                                onPress={handleQuickAdd}
                                selected={selectedAmount === item.amount}
                            />
                        ))}
                    </View>
                </View>

                {/* History Section */}
                <View style={styles.historyContainer}>
                    <View style={styles.historyHeader}>
                        <Text style={styles.sectionTitle}>Geçmiş</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('History')}>
                            <Text style={styles.seeAllText}>Tümünü Gör</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Loading State */}
                    {loading && historyData.length === 0 && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                            <Text style={styles.loadingText}>Yükleniyor...</Text>
                        </View>
                    )}

                    {/* Empty State */}
                    {!loading && historyData.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Icon
                                name={Icons.ACTIVITY.name}
                                family={Icons.ACTIVITY.family}
                                size={IconSize.XXXLARGE}
                                color={Colors.gray400}
                            />
                            <Text style={styles.emptyText}>Henüz geçmiş kayıt yok</Text>
                            <Text style={styles.emptySubtext}>
                                Su içmeye başladığınızda buradan takip edebilirsiniz
                            </Text>
                        </View>
                    )}

                    {/* History Items */}
                    {historyData.slice(0, 5).map((item, index) => (
                        <HistoryItem
                            key={item.date}
                            date={formatDate(item.date)}
                            percentage={item.percentage}
                            amount={item.total}
                            goal={item.goal}
                            delay={index * 100}
                        />
                    ))}
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
    headerButton: {
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
    scrollContent: {
        paddingBottom: 100,
    },
    glassContainer: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: Colors.white,
        marginBottom: 20,
    },
    quickAddContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: Colors.white,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 16,
    },
    quickAddButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    historyContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    seeAllText: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '600',
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: Colors.textSecondary,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    emptySubtext: {
        marginTop: 8,
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
});

export default DashboardScreen;
