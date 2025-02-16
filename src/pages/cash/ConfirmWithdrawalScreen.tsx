import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { Button } from '@/components/cash/Button/Button';
import { SuccessModal } from '@/components/cash/SuccessModal/SuccessModal';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

type ConfirmWithdrawalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConfirmWithdrawal'
>;

type ConfirmWithdrawalScreenRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmWithdrawal'
>;

type ConfirmWithdrawalScreenProps = {
  navigation: ConfirmWithdrawalScreenNavigationProp;
  route: ConfirmWithdrawalScreenRouteProp;
};

export const ConfirmWithdrawalScreen: React.FC<
  ConfirmWithdrawalScreenProps
> = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { withdrawalInfo } = route.params;
  const handleClick = () => {
    setModalVisible(true);
  };
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Header title="Confirm Withdrawal" showBackButton />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View
          className="flex-row justify-between items-center px-4 py-5 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          <Text variant="md" color="text">
            Amount
          </Text>
          <Text variant="md" color="text">
            ${withdrawalInfo.amount} {withdrawalInfo.currency}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-center px-4 py-5 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          <Text variant="md" color="text">
            Method
          </Text>
          <Text variant="md" color="text">
            {withdrawalInfo.method}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-center px-4 py-5 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          <Text variant="md" color="text">
            Withdraw To
          </Text>
          <Text variant="md" color="text">
            {withdrawalInfo.bankAccount.accountName}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-center px-4 py-5 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          <Text variant="md" color="text">
            Fees
          </Text>
          <Text variant="md" color="text">
            ${withdrawalInfo.fee} {withdrawalInfo.currency}
          </Text>
        </View>
        <View
          className="flex-row justify-between items-center px-4 py-5 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          <Text variant="md" color="text" weight="semibold">
            Received Amount
          </Text>
          <Text variant="md" color="primary" weight="semibold">
            ${withdrawalInfo.receiveAmount} {withdrawalInfo.currency}
          </Text>
        </View>
        {/* Fee note */}
        <Text variant="base" color="secondaryText" className="px-4 mt-4">
          Please note: Your bank might apply a processing fee
        </Text>
      </ScrollView>
      {/* Fixed bottom button */}
      <View className="px-4 py-4" style={{ borderColor: theme.colors.border }}>
        <Button onPress={handleClick} text="Confirm" />
      </View>
      {/* Render the SuccessModal. It will appear if `modalVisible` is true */}
      <SuccessModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        subheading="Lorem ipsum dolor sit amet, consectetur"
        heading="Your bank transfer account is now ready to use"
      />
    </SafeAreaView>
  );
};
