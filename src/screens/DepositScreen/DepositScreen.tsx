import React from 'react';
import { View, ScrollView, SafeAreaView, Text, FlatList } from 'react-native';
import { Header } from '../../components/Header/Header';
import { DepositInfoSection } from '../../components/DepositInfoSection/DepositInfoSection';
import { WarningsSection } from '../../components/WarningsSection/WarningsSection';
import { BankInfoRow } from '../../components/BankInfoRow/BankInfoRow';
import { Button } from '../../components/Button/Button';
import { styles } from './styles';

const depositBullets = [
  'Minimum deposit of at least $50 USD',
  'Deposits are usually credited in 1–5 business days',
  'We charge zero deposit fee. Substantial fees may be applied by your bank...',
  'To learn more, visit our Help Center',
];

const warnings = [
  'The name on your bank account must match the name on your Crypto.com account.',
  'Deposit USD only. Non-USD deposits will be converted at prevalent conversion rates.',
  'Deposit from an account within Taiwan, Province of China only...',
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
    console.log('Send info button pressed');
  };

  // Renders each bank info row
  const renderBankInfoItem = ({ item }: { item: { label: string; value: string } }) => {
    return <BankInfoRow label={item.label} value={item.value} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="USD Bank Transfer" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Deposit Information Section */}
        <DepositInfoSection title="Deposit Information" bullets={depositBullets} />

        {/* Warnings Section */}
        <WarningsSection warnings={warnings} />

        <Text style={styles.infoNote}>
          Enter the information below into your banking app to transfer funds
          using SWIFT to your Crypto.com account
        </Text>

        {/* Rounded Card for Bank Info Rows */}
        <View style={styles.bankInfoCard}>
          <FlatList
            data={bankInfo}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderBankInfoItem}
            ItemSeparatorComponent={() => null}      // remove any default line separators
            scrollEnabled={false}                    // disable scroll to avoid nested scrolling
          />
        </View>
      </ScrollView>

      <View style={styles.bottomButton}>
        <Button title="Send Info To Email" onPress={handleSendInfo} />
      </View>
    </SafeAreaView>
  );
};
