import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

function AppInner() {
  const { initializeAuth } = useAuth();
  useEffect(() => {
    initializeAuth();
    // initializeAuth is stable (function declaration in AuthProvider, not recreated on re-render)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RootNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppInner />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
