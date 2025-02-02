import React, { useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { AppState } from '@/store/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Load stored state on mount
    const loadState = async () => {
      const storedState = await AsyncStorage.getItem('appState');
      if (storedState) {
        setState(JSON.parse(storedState));
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    // Save state to storage on change
    AsyncStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
