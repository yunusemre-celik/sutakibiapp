import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants';

/**
 * Quick Add Button Component
 * 
 * Hızlı su ekleme butonu - farklı miktarlar için
 * 
 * @param {number} amount - Su miktarı (litre)
 * @param {string} label - Buton etiketi (örn: "250ml", "1L")
 * @param {function} onPress - Tıklama fonksiyonu
 * @param {boolean} selected - Seçili mi?
 */
const QuickAddButton = ({ amount, label, onPress, selected = false }) => {
    return (
        <TouchableOpacity
            style={[styles.button, selected && styles.buttonSelected]}
            onPress={() => onPress(amount)}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, selected && styles.buttonTextSelected]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonSelected: {
        backgroundColor: Colors.primary,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
    buttonTextSelected: {
        color: Colors.white,
    },
});

export default QuickAddButton;
