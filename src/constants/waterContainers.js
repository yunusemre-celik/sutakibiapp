// Water container sizes in liters
export const WATER_CONTAINERS = {
    SHOT_GLASS: { id: 'shot_glass', name: 'Shot Bardağı', volume: 0.04 },
    TEA_GLASS: { id: 'tea_glass', name: 'Çay Bardağı', volume: 0.125 },
    SMALL_WATER_GLASS: { id: 'small_water_glass', name: 'Küçük Su Bardağı', volume: 0.2 },
    MEDIUM_WATER_GLASS: { id: 'medium_water_glass', name: 'Orta Su Bardağı', volume: 0.18 },
    BIG_WATER_GLASS: { id: 'big_water_glass', name: 'Büyük Su Bardağı', volume: 0.35 },
    TALL_WATER_GLASS: { id: 'tall_water_glass', name: 'Uzun Su Bardağı', volume: 0.5 },
    SMALL_BOTTLED_WATER: { id: 'small_bottled_water', name: 'Küçük Şişe Su', volume: 0.25 },
    MEDIUM_BOTTLED_WATER: { id: 'medium_bottled_water', name: 'Orta Şişe Su', volume: 0.5 },
    BIG_BOTTLED_WATER: { id: 'big_bottled_water', name: 'Büyük Şişe Su', volume: 1.0 },
    TALL_BOTTLED_WATER: { id: 'tall_bottled_water', name: 'Çok Büyük Şişe Su', volume: 1.5 },
};

// Get all containers as an array
export const getContainersList = () => {
    return Object.values(WATER_CONTAINERS);
};

// Get container by ID
export const getContainerById = (id) => {
    return Object.values(WATER_CONTAINERS).find(container => container.id === id);
};
