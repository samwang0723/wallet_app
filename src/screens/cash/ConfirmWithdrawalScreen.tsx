import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { Button } from '@/components/cash/Button/Button';
import { SuccessModal } from '@/components/cash/SuccessModal/SuccessModal';

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
    <SafeAreaView style={styles.container}>
      <Header title="Confirm Withdrawal" showBackButton />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Amount</Text>
          <Text style={styles.optionText}>
            ${withdrawalInfo.amount} {withdrawalInfo.currency}
          </Text>
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Method</Text>
          <Text style={styles.optionText}>{withdrawalInfo.method}</Text>
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Withdraw To</Text>
          <Text style={styles.optionText}>
            {withdrawalInfo.bankAccount.accountName}
          </Text>
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Fees</Text>
          <Text style={styles.optionText}>
            ${withdrawalInfo.fee} {withdrawalInfo.currency}
          </Text>
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.optionBoldText}>Received Amount</Text>
          <Text style={styles.optionBoldTextColor}>
            ${withdrawalInfo.receiveAmount} {withdrawalInfo.currency}
          </Text>
        </View>
        {/* Fee note */}
        <Text style={styles.noteText}>
          Please note: Your bank might apply a processing fee
        </Text>
      </ScrollView>
      {/* Fixed bottom button */}
      <View style={styles.bottomButton}>
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
