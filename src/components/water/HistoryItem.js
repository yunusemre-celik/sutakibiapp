import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { Colors } from '../../constants';

/**
 * History Item Component
 * 
 * Geçmiş su tüketim kaydını gösterir - tarih ve yüzdelik bar ile
 * 
 * @param {string} date - Tarih (örn: "31 Ocak")
 * @param {number} percentage - Tamamlanma yüzdesi (0-100)
 * @param {number} amount - Tüketilen miktar (litre)
 * @param {number} goal - Hedef miktar (litre)
 * @param {number} delay - Animasyon gecikmesi (ms)
 */
const HistoryItem = ({
    date,
    percentage = 0,
    amount = 0,
    goal = 2.5,
    delay = 0,
}) => {
    const progressWidth = useSharedValue(0);
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    useEffect(() => {
        // Animate progress bar with delay
        setTimeout(() => {
            progressWidth.value = withSpring(clampedPercentage, {
                damping: 15,
                stiffness: 100,
            });
        }, delay);
    }, [clampedPercentage, delay]);

    const animatedProgressStyle = useAnimatedStyle(() => {
        return {
            width: `${progressWidth.value}%`,
        };
    });

    // Determine color based on percentage
    const getBarColor = () => {
        if (clampedPercentage >= 100) return Colors.success;
        if (clampedPercentage >= 75) return Colors.primary;
        if (clampedPercentage >= 50) return Colors.warning;
        return Colors.error;
    };

    return (
        <View style={styles.container}>
            {/* Date and Percentage */}
            <View style={styles.header}>
                <Text style={styles.dateText}>{date}</Text>
                <Text style={styles.percentageText}>{Math.round(clampedPercentage)}%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        animatedProgressStyle,
                        { backgroundColor: getBarColor() },
                    ]}
                />
            </View>

            {/* Amount Info */}
            <Text style={styles.amountText}>
                {amount.toFixed(1)}L / {goal.toFixed(1)}L
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    percentageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    progressBarContainer: {
        height: 12,
        backgroundColor: Colors.gray200,
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        borderRadius: 6,
    },
    amountText: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'right',
    },
});

export default HistoryItem;
