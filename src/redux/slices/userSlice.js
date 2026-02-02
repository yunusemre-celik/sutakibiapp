import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase, isSupabaseConfigured } from '../../services/supabase';

// Mock profile for development
const MOCK_PROFILE = {
    user_id: 'mock-user-id',
    name: 'Demo User',
    birth_date: '1990-01-01',
    gender: 'male',
    location: 'Istanbul',
    weight: 70,
    height: 175,
    activity_level: 'moderate',
    water_goal: 2.5,
    thermos: 0.5,
    onboarding_completed: true,
};

// Async thunks for user data
export const saveUserProfile = createAsyncThunk(
    'user/saveProfile',
    async (profileData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const userId = auth.user?.id;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            // If Supabase is not configured, use mock data
            if (!isSupabaseConfigured) {
                console.warn('Using mock save profile');
                return { ...MOCK_PROFILE, ...profileData };
            }

            const { data, error } = await supabase
                .from('user_profiles')
                .upsert({
                    user_id: userId,
                    ...profileData,
                    updated_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'user/fetchProfile',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const userId = auth.user?.id;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            // If Supabase is not configured, use mock data
            if (!isSupabaseConfigured) {
                console.warn('Using mock fetch profile');
                return MOCK_PROFILE;
            }

            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                // If profile doesn't exist, return null
                if (error.code === 'PGRST116') {
                    return null;
                }
                throw error;
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateWaterGoal = createAsyncThunk(
    'user/updateWaterGoal',
    async (waterGoal, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const userId = auth.user?.id;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            // If Supabase is not configured, use mock data
            if (!isSupabaseConfigured) {
                console.warn('Using mock update water goal');
                return waterGoal;
            }

            const { data, error } = await supabase
                .from('user_profiles')
                .update({ water_goal: waterGoal })
                .eq('user_id', userId)
                .select()
                .single();

            if (error) throw error;
            return data.water_goal;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        loading: false,
        error: null,
        onboardingCompleted: false,
    },
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        setOnboardingCompleted: (state, action) => {
            state.onboardingCompleted = action.payload;
        },
        updateProfileLocally: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            // Save Profile
            .addCase(saveUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.onboardingCompleted = action.payload.onboarding_completed;
            })
            .addCase(saveUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.onboardingCompleted = action.payload?.onboarding_completed || false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Water Goal
            .addCase(updateWaterGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateWaterGoal.fulfilled, (state, action) => {
                state.loading = false;
                if (state.profile) {
                    state.profile.water_goal = action.payload;
                }
            })
            .addCase(updateWaterGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUserError, setOnboardingCompleted, updateProfileLocally } = userSlice.actions;
export default userSlice.reducer;
