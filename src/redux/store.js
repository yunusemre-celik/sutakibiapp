import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import waterReducer from './slices/waterSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        water: waterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
