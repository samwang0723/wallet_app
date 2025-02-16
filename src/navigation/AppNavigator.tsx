import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ChooseBankAccountScreen } from '@/pages/cash/ChooseBankAccountScreen';
import { InitWithdrawalScreen } from '@/pages/cash/InitWithdrawalScreen';
import { WithdrawInfoScreen } from '@/pages/cash/WithdrawInfoScreen';
import { ConfirmWithdrawalScreen } from '@/pages/cash/ConfirmWithdrawalScreen';
import { DepositScreen } from '@/pages/cash/DepositScreen';
import { HomeScreen } from '@/pages/cash/HomeScreen';
import { TransactionScreen } from '@/pages/cash/TransactionScreen';
import { PaymentNetworkScreen } from '@/pages/cash/PaymentNetworkScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Optional: hide header
      />
      <Stack.Screen
        name="Deposit"
        component={DepositScreen}
        options={{
          presentation: 'modal', // This makes it slide from bottom
          animation: 'slide_from_bottom', // Specifically for bottom animation
          headerShown: false, // Optional: hide header
          // Optional: customize animation
          animationDuration: 200, // animation duration in ms
          gestureEnabled: true, // enable swipe down to dismiss
          gestureDirection: 'vertical', // swipe direction
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{ headerShown: false }} // Optional: hide header
      />
      <Stack.Screen
        name="ChooseBankAccount"
        component={ChooseBankAccountScreen}
        options={{ headerShown: false }} // Optional: hide header
      />
      <Stack.Screen
        name="InitWithdrawal"
        component={InitWithdrawalScreen}
        options={{ headerShown: false }} // Optional: hide header
      />
      <Stack.Screen
        name="WithdrawInfo"
        component={WithdrawInfoScreen}
        options={{
          presentation: 'modal', // This makes it slide from bottom
          animation: 'slide_from_bottom', // Specifically for bottom animation
          headerShown: false, // Optional: hide header
          // Optional: customize animation
          animationDuration: 200, // animation duration in ms
          gestureEnabled: true, // enable swipe down to dismiss
          gestureDirection: 'vertical', // swipe direction
        }}
      />
      <Stack.Screen
        name="ConfirmWithdrawal"
        component={ConfirmWithdrawalScreen}
        options={{ headerShown: false }} // Optional: hide header
      />
      <Stack.Screen
        name="PaymentNetwork"
        component={PaymentNetworkScreen}
        options={{ headerShown: false }} // Optional: hide header
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
