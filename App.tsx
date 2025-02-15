import AppProvider from '@/context/AppProvider';
import AppNavigator from '@/navigation/AppNavigator';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/themes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
