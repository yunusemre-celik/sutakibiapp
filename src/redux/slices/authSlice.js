import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase, isSupabaseConfigured } from '../../services/supabase';

// Mock user for development without Supabase
const MOCK_USER = {
    id: 'mock-user-id',
    email: 'demo@sutakibi.com',
    user_metadata: { name: 'Demo User' },
};

// Async thunks for authentication
export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // If Supabase is not configured, use mock data
            if (!isSupabaseConfigured) {
                console.warn('Using mock sign up');
                return {
                    user: MOCK_USER,
                    session: { user: MOCK_USER, access_token: 'mock-token' },
                };
            }

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // If Supabase is not configured, use mock data
            if (!isSupabaseConfigured) {
                console.warn('Using mock sign in');
                return {
                    user: MOCK_USER,
                    session: { user: MOCK_USER, access_token: 'mock-token' },
                };
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signOut = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            // If Supabase is not configured, just clear state
            if (!isSupabaseConfigured) {
                console.warn('Using mock sign out');
                return null;
            }

            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkSession = createAsyncThunk(
    'auth/checkSession',
    async (_, { rejectWithValue }) => {
        try {
            // If Supabase is not configured, return null (no session)
            if (!isSupabaseConfigured) {
                console.warn('Supabase not configured - no session check');
                return null;
            }

            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            return session;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        session: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Sign Up
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.session = action.payload.session;
                state.isAuthenticated = true;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Sign In
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.session = action.payload.session;
                state.isAuthenticated = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Sign Out
            .addCase(signOut.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.session = null;
                state.isAuthenticated = false;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Check Session
            .addCase(checkSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.session = action.payload;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                }
            })
            .addCase(checkSession.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
            });
    },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
