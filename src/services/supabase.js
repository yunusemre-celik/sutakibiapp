import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// IMPORTANT: Replace these with your actual Supabase credentials
// Get them from: https://app.supabase.com/project/_/settings/api

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is configured
export const isSupabaseConfigured =
    SUPABASE_URL !== 'https://placeholder.supabase.co' &&
    SUPABASE_ANON_KEY !== 'placeholder-key';

// Create Supabase client (will be null if not configured)
export const supabase = isSupabaseConfigured
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// Helper function to check if Supabase is available
export const checkSupabaseAvailability = () => {
    if (!isSupabaseConfigured) {
        console.warn('⚠️ Supabase is not configured. Using mock data.');
        console.warn('To configure Supabase:');
        console.warn('1. Create a .env file in the root directory');
        console.warn('2. Add SUPABASE_URL and SUPABASE_ANON_KEY');
        console.warn('3. Restart the app');
        return false;
    }
    return true;
};

export default supabase;
