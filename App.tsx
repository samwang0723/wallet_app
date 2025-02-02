import AppProvider from '@/context/AppProvider';
import AppNavigator from '@/navigation/AppNavigator';
import React from 'react';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
