import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ChooseBankAccountScreen } from '@/screens/cash/ChooseBankAccountScreen';
import { InitWithdrawalScreen } from '@/screens/cash/InitWithdrawalScreen';
import { WithdrawInfoScreen } from '@/screens/cash/WithdrawInfoScreen';
import { ConfirmWithdrawalScreen } from '@/screens/cash/ConfirmWithdrawalScreen';
import { DepositScreen } from '@/screens/cash/DepositScreen';
import { HomeScreen } from '@/screens/cash/HomeScreen';
import { TransactionScreen } from '@/screens/cash/TransactionScreen';

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
        options={{ headerShown: false }} // Optional: hide header
      />
      <Stack.Screen
        name="ConfirmWithdrawal"
        component={ConfirmWithdrawalScreen}
        options={{ headerShown: false }} // Optional: hide header
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
