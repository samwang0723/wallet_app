import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DepositScreen } from '@/screens/DepositScreen/DepositScreen';
import Toast, { BaseToast, ErrorToast, ToastConfig, BaseToastProps } from 'react-native-toast-message';

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#333' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        color: '#fff',
        flexWrap: 'wrap',      // allow wrapping
      }}
      text1NumberOfLines={5}   // allow up to 5 lines (or 0 for no limit)
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 14,
        color: '#fff',
        flexWrap: 'wrap',
      }}
      text1NumberOfLines={5}
    />
  ),
};

export default function App() {
  return (
    <NavigationContainer>
      <DepositScreen />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}
