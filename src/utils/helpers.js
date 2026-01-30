// Calculate recommended daily water intake based on weight
export const calculateWaterGoal = (weight, gender = 'male') => {
    // Basic formula: 30-35ml per kg of body weight
    const baseMultiplier = gender === 'male' ? 35 : 30;
    const goalInMl = weight * baseMultiplier;
    const goalInLiters = goalInMl / 1000;

    // Round to 1 decimal place
    return Math.round(goalInLiters * 10) / 10;
};

// Calculate age from birth date
export const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

// Calculate BMI (Body Mass Index)
export const calculateBMI = (weight, height) => {
    // weight in kg, height in cm
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
};

// Format volume to display (e.g., 0.5 -> "500ml" or "0.5L")
export const formatVolume = (liters, preferLiters = false) => {
    if (liters >= 1 || preferLiters) {
        return `${liters.toFixed(2)}L`;
    }
    const ml = Math.round(liters * 1000);
    return `${ml}ml`;
};

// Calculate percentage of goal achieved
export const calculateProgress = (current, goal) => {
    if (goal === 0) return 0;
    const percentage = (current / goal) * 100;
    return Math.min(Math.round(percentage), 100);
};

// Format date to readable string
export const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

// Format time to readable string
export const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Get greeting based on time of day
export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return 'Günaydın';
    } else if (hour < 18) {
        return 'İyi günler';
    } else {
        return 'İyi akşamlar';
    }
};

// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
    // At least 8 characters
    return password.length >= 8;
};

// Get days in current month
export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

// Check if date is today
export const isToday = (date) => {
    const today = new Date();
    const d = new Date(date);

    return d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear();
};

// Get start and end of day
export const getStartOfDay = (date = new Date()) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

export const getEndOfDay = (date = new Date()) => {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
};
