import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DepositScreen } from '@/screens/cash/DepositScreen';
import { HomeScreen } from '@/screens/cash/HomeScreen';
import { TransactionScreen } from '@/screens/cash/TransactionScreen';
import { RootStackParamList } from '@/types';
import { ChooseWithdrawScreen } from '@/screens/cash/ChooseWithdrawScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
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
            name="ChooseWithdraw"
            component={ChooseWithdrawScreen}
            options={{ headerShown: false }} // Optional: hide header
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
