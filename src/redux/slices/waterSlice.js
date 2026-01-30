import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase';

// Async thunks for water logging
export const logWaterIntake = createAsyncThunk(
    'water/logIntake',
    async ({ containerId, volume, customVolume }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const userId = auth.user?.id;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            const actualVolume = customVolume || volume;

            const { data, error } = await supabase
                .from('water_logs')
                .insert({
                    user_id: userId,
                    container_id: containerId,
                    volume: actualVolume,
                    logged_at: new Date().toISOString(),
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

export const fetchTodayWaterLogs = createAsyncThunk(
    'water/fetchTodayLogs',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const userId = auth.user?.id;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const { data, error } = await supabase
                .from('water_logs')
                .select('*')
                .eq('user_id', userId)
                .gte('logged_at', today.toISOString())
                .lt('logged_at', tomorrow.toISOString())
                .order('logged_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchWaterHistory = createAsyncThunk(
    'water/fetchHistory',
    async ({ startDate, endDate }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const userId = auth.user?.id;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await supabase
                .from('water_logs')
                .select('*')
                .eq('user_id', userId)
                .gte('logged_at', startDate)
                .lte('logged_at', endDate)
                .order('logged_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteWaterLog = createAsyncThunk(
    'water/deleteLog',
    async (logId, { rejectWithValue }) => {
        try {
            const { error } = await supabase
                .from('water_logs')
                .delete()
                .eq('id', logId);

            if (error) throw error;
            return logId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const waterSlice = createSlice({
    name: 'water',
    initialState: {
        todayLogs: [],
        todayTotal: 0,
        history: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearWaterError: (state) => {
            state.error = null;
        },
        resetTodayLogs: (state) => {
            state.todayLogs = [];
            state.todayTotal = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Log Water Intake
            .addCase(logWaterIntake.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logWaterIntake.fulfilled, (state, action) => {
                state.loading = false;
                state.todayLogs.unshift(action.payload);
                state.todayTotal += action.payload.volume;
            })
            .addCase(logWaterIntake.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Today's Logs
            .addCase(fetchTodayWaterLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodayWaterLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.todayLogs = action.payload;
                state.todayTotal = action.payload.reduce((sum, log) => sum + log.volume, 0);
            })
            .addCase(fetchTodayWaterLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Water History
            .addCase(fetchWaterHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWaterHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            })
            .addCase(fetchWaterHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Water Log
            .addCase(deleteWaterLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWaterLog.fulfilled, (state, action) => {
                state.loading = false;
                const deletedLog = state.todayLogs.find(log => log.id === action.payload);
                if (deletedLog) {
                    state.todayTotal -= deletedLog.volume;
                }
                state.todayLogs = state.todayLogs.filter(log => log.id !== action.payload);
                state.history = state.history.filter(log => log.id !== action.payload);
            })
            .addCase(deleteWaterLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearWaterError, resetTodayLogs } = waterSlice.actions;
export default waterSlice.reducer;
