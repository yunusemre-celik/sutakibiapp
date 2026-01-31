import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants';

const { width } = Dimensions.get('window');

/**
 * Animated Water Glass Component
 * 
 * Animasyonlu su bardağı - günlük su tüketim hedefini gösterir
 * 
 * @param {number} currentAmount - Mevcut su miktarı (litre)
 * @param {number} goalAmount - Hedef su miktarı (litre)
 * @param {number} percentage - Yüzde (0-100)
 * @param {number} height - Bardak yüksekliği (default: 300)
 * @param {number} width - Bardak genişliği (default: 200)
 */
const WaterGlass = ({
    currentAmount = 0,
    goalAmount = 2.5,
    percentage = 0,
    height = 300,
    width: glassWidth = 200,
}) => {
    // Animation values
    const waterHeight = useSharedValue(0);
    const waveOffset = useSharedValue(0);

    // Calculate percentage if not provided
    const calculatedPercentage = percentage || (currentAmount / goalAmount) * 100;
    const clampedPercentage = Math.min(Math.max(calculatedPercentage, 0), 100);

    useEffect(() => {
        // Animate water level
        waterHeight.value = withSpring((clampedPercentage / 100) * height, {
            damping: 15,
            stiffness: 100,
        });

        // Animate wave effect
        waveOffset.value = withTiming(10, {
            duration: 2000,
        });
    }, [clampedPercentage, height]);

    // Animated style for water
    const animatedWaterStyle = useAnimatedStyle(() => {
        return {
            height: waterHeight.value,
        };
    });

    return (
        <View style={styles.container}>
            {/* Glass Container */}
            <View
                style={[
                    styles.glass,
                    {
                        height: height,
                        width: glassWidth,
                    },
                ]}
            >
                {/* Water Fill */}
                <Animated.View
                    style={[
                        styles.water,
                        animatedWaterStyle,
                        {
                            width: glassWidth - 8, // Account for border
                        },
                    ]}
                />

                {/* Percentage Text */}
                <View style={styles.percentageContainer}>
                    <Text style={styles.percentageText}>
                        {Math.round(clampedPercentage)}%
                    </Text>
                    <Text style={styles.amountText}>
                        {currentAmount.toFixed(1)}L / {goalAmount.toFixed(1)}L
                    </Text>
                </View>
            </View>

            {/* Goal Label */}
            <Text style={styles.goalLabel}>Günlük Hedef</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    glass: {
        borderWidth: 4,
        borderColor: Colors.primary,
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(34, 103, 242, 0.1)',
    },
    water: {
        position: 'absolute',
        bottom: 0,
        left: 4,
        backgroundColor: Colors.primary,
        borderRadius: 4,
    },
    percentageContainer: {
        position: 'absolute',
        top: '50%',
        alignItems: 'center',
        zIndex: 10,
    },
    percentageText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colors.white,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    amountText: {
        fontSize: 16,
        color: Colors.white,
        marginTop: 8,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    goalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginTop: 16,
    },
});

export default WaterGlass;
