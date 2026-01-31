import React from 'react';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#2267f2';

/**
 * Reusable Icon Component
 * 
 * @param {string} name - Icon name
 * @param {number} size - Icon size (default: 24)
 * @param {string} color - Icon color (default: PRIMARY_COLOR #2267f2)
 * @param {string} family - Icon family: 'Feather', 'FontAwesome', 'MaterialCommunityIcons' (default: 'Feather')
 * @param {object} style - Additional styles
 * 
 * @example
 * <Icon name="home" size={24} />
 * <Icon name="google" family="FontAwesome" />
 * <Icon name="scale-bathroom" family="MaterialCommunityIcons" />
 */
const Icon = ({
    name,
    size = 24,
    color = PRIMARY_COLOR,
    family = 'Feather',
    style,
    ...props
}) => {
    const IconComponent = {
        Feather,
        FontAwesome,
        MaterialCommunityIcons,
    }[family];

    if (!IconComponent) {
        console.warn(`Icon family "${family}" not found. Using Feather as default.`);
        return <Feather name={name} size={size} color={color} style={style} {...props} />;
    }

    return <IconComponent name={name} size={size} color={color} style={style} {...props} />;
};

export default Icon;
