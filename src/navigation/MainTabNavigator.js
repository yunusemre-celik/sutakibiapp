import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import DashboardScreen from '../screens/main/DashboardScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import { Colors } from '../constants';

const Tab = createBottomTabNavigator();

/**
 * Main Tab Navigator
 * 
 * Ana uygulama tab navigation - Dashboard, History, Profile, Settings
 */
const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        iconName = 'home';
                    } else if (route.name === 'History') {
                        iconName = 'clock';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    }

                    return <Feather name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.gray400,
                tabBarStyle: {
                    backgroundColor: Colors.white,
                    borderTopWidth: 1,
                    borderTopColor: Colors.border,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            })}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Ana Sayfa',
                }}
            />
            <Tab.Screen
                name="History"
                component={DashboardScreen} // TODO: Create HistoryScreen
                options={{
                    tabBarLabel: 'Geçmiş',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={DashboardScreen} // TODO: Create ProfileScreen
                options={{
                    tabBarLabel: 'Profil',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Ayarlar',
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
