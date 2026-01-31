import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

/**
 * Underwater Background Component
 * 
 * Su altı temalı arka plan bileşeni - blur efekti ve overlay ile
 * 
 * @param {ReactNode} children - İçerik
 * @param {number} blurAmount - Blur miktarı (0-100, default: 10)
 * @param {string} blurType - Blur tipi: 'light', 'dark', 'xlight' (default: 'light')
 * @param {number} overlayOpacity - Overlay opaklığı (0-1, default: 0.3)
 * @param {string} overlayColor - Overlay rengi (default: 'black')
 * @param {boolean} showBlur - Blur göster/gizle (default: true)
 * @param {boolean} showOverlay - Overlay göster/gizle (default: true)
 * @param {object} style - Ek stil
 */
const UnderwaterBackground = ({
    children,
    blurAmount = 10,
    blurType = 'light',
    overlayOpacity = 0.3,
    overlayColor = 'black',
    showBlur = true,
    showOverlay = true,
    style,
}) => {
    return (
        <ImageBackground
            source={require('../../assets/underwater-bg.png')}
            style={[styles.background, style]}
            resizeMode="cover"
        >
            {/* Blur Layer */}
            {showBlur && (
                <BlurView
                    style={styles.blurView}
                    blurType={blurType}
                    blurAmount={blurAmount}
                    reducedTransparencyFallbackColor="white"
                />
            )}

            {/* Overlay Layer */}
            {showOverlay && (
                <View
                    style={[
                        styles.overlay,
                        {
                            backgroundColor: `rgba(${overlayColor === 'black' ? '0,0,0' : '255,255,255'
                                },${overlayOpacity})`,
                        },
                    ]}
                />
            )}

            {/* Content */}
            <View style={styles.content}>{children}</View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    content: {
        flex: 1,
    },
});

export default UnderwaterBackground;
