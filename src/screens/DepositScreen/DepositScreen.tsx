import React from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { Header } from '../../components/Header/Header';
import { DepositInfoSection } from '../../components/DepositInfoSection/DepositInfoSection';
import { WarningsSection } from '../../components/WarningsSection/WarningsSection';
import { BankInfoRow } from '../../components/BankInfoRow/BankInfoRow';
import { Button } from '../../components/Button/Button';
import { styles } from './styles';

// Sample bullet points for "Deposit Information"
const depositBullets = [
  'Minimum deposit of at least $50 USD',
  'Deposits are usually credited in 1–5 business days',
  'We charge zero deposit fee. Substantial fees may be applied by your bank, please check prior to sending',
  'To learn more, visit our Help Center',
];

// Sample warnings
const warnings = [
  'The name on your bank account must match the name on your Crypto.com account.',
  'Deposit USD only. Non-USD deposits will be converted at prevalent conversion rates.',
  'Deposit from an account within Taiwan, Province of China only.',
  'Deposits from overseas bank account can lead to delayed returns and money loss due to intermediary bank fees.',
];

// Bank info rows from the screenshot
const bankInfo = [
  { label: 'IBAN', value: 'AE360446417770350161683' },
  { label: 'Bank Name', value: 'Standard Chartered Bank UAE' },
  { label: 'Bank Account Holder Name', value: 'Foris Dax Middle East FZE' },
  {
    label: 'Bank Address',
    value:
      'Emaar Business Park, Building 3, Opposite Dubai Internet City (DIC), P.O. Box 103669, Dubai, UAE',
  },
  {
    label: 'Recipient Address',
    value:
      'The Offices 4, 8th Floor, One Central, Dubai World Trade Centre, PO Box 452116, Dubai, UAE',
  },
];

export const DepositScreen: React.FC = () => {
  const handleSendInfo = () => {
    // Handle "Send Info To Email" action
    console.log('Send info button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="USD Bank Transfer" />
      <ScrollView style={styles.content}>

        {/* Deposit Information Section */}
        <DepositInfoSection title="Deposit Information" bullets={depositBullets} />

        {/* Warnings Section */}
        <WarningsSection warnings={warnings} />

        <Text style={styles.infoNote}>
          Enter the information below into your banking app to transfer funds
          using SWIFT to your Crypto.com account
        </Text>

        {/* Bank Info Rows */}
        {bankInfo.map((info, index) => (
          <BankInfoRow key={index} {...info} />
        ))}

      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButton}>
        <Button title="Send Info To Email" onPress={handleSendInfo} />
      </View>
    </SafeAreaView>
  );
};
