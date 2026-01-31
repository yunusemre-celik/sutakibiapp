import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import store from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Main App Component
 * 
 * Redux Provider ve Navigation Container
 */
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </Provider>
  );
}
