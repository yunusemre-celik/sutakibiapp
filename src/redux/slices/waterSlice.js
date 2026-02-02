import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase, isSupabaseConfigured } from '../../services/supabase';

// Mock water logs for development
const MOCK_LOGS = [
    { id: '1', volume: 0.5, logged_at: new Date().toISOString(), container_id: 'mock' },
    { id: '2', volume: 0.25, logged_at: new Date(Date.now() - 3600000).toISOString(), container_id: 'mock' },
];

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

            // If Supabase is not configured, use mock data
            if (!isSupabaseConfigured) {
                console.warn('Using mock log water intake');
                return {
                    id: Date.now().toString(),
                    user_id: userId,
                    container_id: containerId,
                    volume: actualVolume,
                    logged_at: new Date().toISOString(),
                };
            }

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

            // If Supabase is not configured, use mock data
            if (!isSupabaseConfigured) {
                console.warn('Using mock fetch today logs');
                return MOCK_LOGS;
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

// NEW: Fetch daily summaries for history
export const fetchDailySummaries = createAsyncThunk(
    'water/fetchDailySummaries',
    async (days = 7, { getState, rejectWithValue }) => {
        try {
            const { auth, user } = getState();
            const userId = auth.user?.id;
            const waterGoal = user.profile?.water_goal || 2.5;

            if (!userId) {
                throw new Error('User not authenticated');
            }

            // If Supabase is not configured, use mock data
            if (!isSupabaseConfigured) {
                console.warn('Using mock daily summaries');
                const today = new Date().toISOString().split('T')[0];
                const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
                return [
                    { date: today, total: 0.75, percentage: 30, goal: waterGoal, logs: MOCK_LOGS },
                    { date: yesterday, total: 2.4, percentage: 96, goal: waterGoal, logs: [] },
                ];
            }

            const endDate = new Date();
            endDate.setHours(23, 59, 59, 999);
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
            startDate.setHours(0, 0, 0, 0);

            const { data, error } = await supabase
                .from('water_logs')
                .select('*')
                .eq('user_id', userId)
                .gte('logged_at', startDate.toISOString())
                .lte('logged_at', endDate.toISOString())
                .order('logged_at', { ascending: false });

            if (error) throw error;

            // Group by date and calculate daily totals
            const dailySummaries = {};
            data.forEach(log => {
                const date = new Date(log.logged_at);
                const dateKey = date.toISOString().split('T')[0];

                if (!dailySummaries[dateKey]) {
                    dailySummaries[dateKey] = {
                        date: dateKey,
                        total: 0,
                        logs: [],
                    };
                }

                dailySummaries[dateKey].total += log.volume;
                dailySummaries[dateKey].logs.push(log);
            });

            // Convert to array and add percentage
            const summariesArray = Object.values(dailySummaries).map(summary => ({
                ...summary,
                percentage: (summary.total / waterGoal) * 100,
                goal: waterGoal,
            }));

            // Sort by date descending
            summariesArray.sort((a, b) => new Date(b.date) - new Date(a.date));

            return summariesArray;
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
        dailySummaries: [],
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
            // Fetch Daily Summaries
            .addCase(fetchDailySummaries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDailySummaries.fulfilled, (state, action) => {
                state.loading = false;
                state.dailySummaries = action.payload;
            })
            .addCase(fetchDailySummaries.rejected, (state, action) => {
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
