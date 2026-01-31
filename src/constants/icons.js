/**
 * App Icons Configuration
 * 
 * Bu dosya tüm uygulama ikonlarını merkezi bir yerden yönetir.
 * İkon değişiklikleri için sadece bu dosyayı güncellemeniz yeterlidir.
 */

// Primary Color
export const PRIMARY_COLOR = '#2267f2';

// Icon Families
export const IconFamily = {
    FEATHER: 'Feather',
    FONT_AWESOME: 'FontAwesome',
    MATERIAL_COMMUNITY: 'MaterialCommunityIcons',
};

// Icon Names by Category
export const Icons = {
    // Authentication & Onboarding
    HAND: { name: 'hand', family: IconFamily.FEATHER },
    ARROW_RIGHT_CIRCLE: { name: 'arrow-right-circle', family: IconFamily.FEATHER },
    SMARTPHONE: { name: 'smartphone', family: IconFamily.FEATHER },
    MAIL: { name: 'mail', family: IconFamily.FEATHER },
    LOCK: { name: 'lock', family: IconFamily.FEATHER },
    USER_PLUS: { name: 'user-plus', family: IconFamily.FEATHER },
    LOG_IN: { name: 'log-in', family: IconFamily.FEATHER },
    EYE: { name: 'eye', family: IconFamily.FEATHER },
    EYE_OFF: { name: 'eye-off', family: IconFamily.FEATHER },
    KEY: { name: 'key', family: IconFamily.FEATHER },

    // Social Login
    GOOGLE: { name: 'google', family: IconFamily.FONT_AWESOME },
    APPLE: { name: 'apple', family: IconFamily.FONT_AWESOME },
    FACEBOOK: { name: 'facebook', family: IconFamily.FONT_AWESOME },

    // Personal Info
    USER: { name: 'user', family: IconFamily.FEATHER },
    CALENDAR: { name: 'calendar', family: IconFamily.FEATHER },
    MAP_PIN: { name: 'map-pin', family: IconFamily.FEATHER },
    GENDER: { name: 'human-male-female', family: IconFamily.MATERIAL_COMMUNITY },

    // Physical Info
    SCALE: { name: 'scale-bathroom', family: IconFamily.MATERIAL_COMMUNITY },
    RULER: { name: 'human-male-height', family: IconFamily.MATERIAL_COMMUNITY },

    // Goal Setting
    TARGET: { name: 'target', family: IconFamily.FEATHER },
    TROPHY: { name: 'trophy', family: IconFamily.MATERIAL_COMMUNITY },
    FLAG: { name: 'flag', family: IconFamily.FEATHER },

    // Navigation
    HOME: { name: 'home', family: IconFamily.FEATHER },
    HISTORY: { name: 'clock', family: IconFamily.FEATHER },
    ACTIVITY: { name: 'activity', family: IconFamily.FEATHER },
    USER_CIRCLE: { name: 'user-circle', family: IconFamily.FONT_AWESOME },
    EDIT: { name: 'edit', family: IconFamily.FEATHER },
    EDIT_2: { name: 'edit-2', family: IconFamily.FEATHER },
    SETTINGS: { name: 'settings', family: IconFamily.FEATHER },
    LOG_OUT: { name: 'log-out', family: IconFamily.FEATHER },

    // Additional useful icons
    CHECK: { name: 'check', family: IconFamily.FEATHER },
    X: { name: 'x', family: IconFamily.FEATHER },
    ALERT_CIRCLE: { name: 'alert-circle', family: IconFamily.FEATHER },
    INFO: { name: 'info', family: IconFamily.FEATHER },
    CHEVRON_RIGHT: { name: 'chevron-right', family: IconFamily.FEATHER },
    CHEVRON_LEFT: { name: 'chevron-left', family: IconFamily.FEATHER },
    PLUS: { name: 'plus', family: IconFamily.FEATHER },
    MINUS: { name: 'minus', family: IconFamily.FEATHER },
};

// Icon Sizes
export const IconSize = {
    SMALL: 16,
    MEDIUM: 20,
    LARGE: 24,
    XLARGE: 32,
    XXLARGE: 48,
    XXXLARGE: 64,
};

// Icon Colors
export const IconColor = {
    PRIMARY: PRIMARY_COLOR,
    ACTIVE: '#1a52c2', // Darker shade of primary
    INACTIVE: '#999',
    WHITE: '#fff',
    BLACK: '#000',
    SUCCESS: '#10b981',
    ERROR: '#ef4444',
    WARNING: '#f59e0b',
};

export default Icons;
