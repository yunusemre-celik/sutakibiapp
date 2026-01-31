import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { checkSession } from '../redux/slices/authSlice';
import { fetchUserProfile } from '../redux/slices/userSlice';
import { Colors } from '../constants';

const Stack = createNativeStackNavigator();

/**
 * App Navigator
 * 
 * Ana navigation yapısı - Auth durumuna göre ekran gösterir
 */
const AppNavigator = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
    const { onboardingCompleted, loading: userLoading } = useSelector((state) => state.user);

    useEffect(() => {
        // Check if user is already logged in
        dispatch(checkSession());
    }, []);

    useEffect(() => {
        // Fetch user profile if authenticated
        if (isAuthenticated) {
            dispatch(fetchUserProfile());
        }
    }, [isAuthenticated]);

    // Show loading screen while checking auth
    if (authLoading || userLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    // Auth Stack
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                ) : !onboardingCompleted ? (
                    // Onboarding Stack (TODO: Create OnboardingNavigator)
                    <Stack.Screen name="Main" component={MainTabNavigator} />
                ) : (
                    // Main App Stack
                    <Stack.Screen name="Main" component={MainTabNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
});

export default AppNavigator;
