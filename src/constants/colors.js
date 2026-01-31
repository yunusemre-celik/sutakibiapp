/**
 * App Colors Configuration
 * 
 * Tüm uygulama renkleri merkezi bir yerden yönetilir.
 */

// Primary Colors
export const PRIMARY_COLOR = '#2267f2';
export const PRIMARY_DARK = '#1a52c2';
export const PRIMARY_LIGHT = '#4d88f5';
export const PRIMARY_LIGHTER = '#7aa8f7';

// Neutral Colors
export const WHITE = '#ffffff';
export const BLACK = '#000000';
export const GRAY_50 = '#f9fafb';
export const GRAY_100 = '#f3f4f6';
export const GRAY_200 = '#e5e7eb';
export const GRAY_300 = '#d1d5db';
export const GRAY_400 = '#9ca3af';
export const GRAY_500 = '#6b7280';
export const GRAY_600 = '#4b5563';
export const GRAY_700 = '#374151';
export const GRAY_800 = '#1f2937';
export const GRAY_900 = '#111827';

// Semantic Colors
export const SUCCESS = '#10b981';
export const SUCCESS_LIGHT = '#34d399';
export const ERROR = '#ef4444';
export const ERROR_LIGHT = '#f87171';
export const WARNING = '#f59e0b';
export const WARNING_LIGHT = '#fbbf24';
export const INFO = '#3b82f6';
export const INFO_LIGHT = '#60a5fa';

// Background Colors
export const BACKGROUND = WHITE;
export const BACKGROUND_SECONDARY = GRAY_50;
export const BACKGROUND_TERTIARY = GRAY_100;

// Text Colors
export const TEXT_PRIMARY = GRAY_900;
export const TEXT_SECONDARY = GRAY_600;
export const TEXT_TERTIARY = GRAY_400;
export const TEXT_DISABLED = GRAY_300;
export const TEXT_ON_PRIMARY = WHITE;

// Border Colors
export const BORDER_COLOR = GRAY_200;
export const BORDER_COLOR_DARK = GRAY_300;
export const BORDER_COLOR_LIGHT = GRAY_100;

// Water Theme Colors (for water tracking)
export const WATER_BLUE = '#3b82f6';
export const WATER_LIGHT = '#93c5fd';
export const WATER_DARK = '#1e40af';

// Shadow Colors
export const SHADOW_COLOR = 'rgba(0, 0, 0, 0.1)';
export const SHADOW_COLOR_DARK = 'rgba(0, 0, 0, 0.2)';

// Overlay Colors
export const OVERLAY_LIGHT = 'rgba(255, 255, 255, 0.9)';
export const OVERLAY_DARK = 'rgba(0, 0, 0, 0.5)';

// Export as default object
const Colors = {
    // Primary
    primary: PRIMARY_COLOR,
    primaryDark: PRIMARY_DARK,
    primaryLight: PRIMARY_LIGHT,
    primaryLighter: PRIMARY_LIGHTER,

    // Neutral
    white: WHITE,
    black: BLACK,
    gray50: GRAY_50,
    gray100: GRAY_100,
    gray200: GRAY_200,
    gray300: GRAY_300,
    gray400: GRAY_400,
    gray500: GRAY_500,
    gray600: GRAY_600,
    gray700: GRAY_700,
    gray800: GRAY_800,
    gray900: GRAY_900,

    // Semantic
    success: SUCCESS,
    successLight: SUCCESS_LIGHT,
    error: ERROR,
    errorLight: ERROR_LIGHT,
    warning: WARNING,
    warningLight: WARNING_LIGHT,
    info: INFO,
    infoLight: INFO_LIGHT,

    // Background
    background: BACKGROUND,
    backgroundSecondary: BACKGROUND_SECONDARY,
    backgroundTertiary: BACKGROUND_TERTIARY,

    // Text
    textPrimary: TEXT_PRIMARY,
    textSecondary: TEXT_SECONDARY,
    textTertiary: TEXT_TERTIARY,
    textDisabled: TEXT_DISABLED,
    textOnPrimary: TEXT_ON_PRIMARY,

    // Border
    border: BORDER_COLOR,
    borderDark: BORDER_COLOR_DARK,
    borderLight: BORDER_COLOR_LIGHT,

    // Water Theme
    waterBlue: WATER_BLUE,
    waterLight: WATER_LIGHT,
    waterDark: WATER_DARK,

    // Shadow
    shadow: SHADOW_COLOR,
    shadowDark: SHADOW_COLOR_DARK,

    // Overlay
    overlayLight: OVERLAY_LIGHT,
    overlayDark: OVERLAY_DARK,
};

export default Colors;
