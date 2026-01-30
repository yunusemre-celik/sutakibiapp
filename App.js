import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux/store';
import { registerForPushNotifications } from './src/services/notificationService';

// TODO: Import navigation after creating navigation structure
// import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    // Register for push notifications on app start
    registerForPushNotifications();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        {/* TODO: Replace with AppNavigator */}
        {/* <AppNavigator /> */}
      </SafeAreaProvider>
    </Provider>
  );
}
