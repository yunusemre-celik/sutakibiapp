import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase';

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

            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateThermos = createAsyncThunk(
    'user/updateThermos',
    async (thermosVolume, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const userId = auth.user?.id;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await supabase
                .from('user_profiles')
                .update({ thermos: thermosVolume })
                .eq('user_id', userId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: {
            name: '',
            surname: '',
            birth_date: null,
            gender: '',
            weight: null,
            height: null,
            country: '',
            thermos: 0.5, // Default thermos size in liters
            water_goal: 2.0, // Default water goal in liters
        },
        loading: false,
        error: null,
        onboardingCompleted: false,
    },
    reducers: {
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
        },
        setOnboardingCompleted: (state, action) => {
            state.onboardingCompleted = action.payload;
        },
        clearUserError: (state) => {
            state.error = null;
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
                state.onboardingCompleted = true;
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
                state.onboardingCompleted = true;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Thermos
            .addCase(updateThermos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateThermos.fulfilled, (state, action) => {
                state.loading = false;
                state.profile.thermos = action.payload.thermos;
            })
            .addCase(updateThermos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { updateProfile, setOnboardingCompleted, clearUserError } = userSlice.actions;
export default userSlice.reducer;
