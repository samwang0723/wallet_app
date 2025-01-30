import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text, FlatList } from 'react-native';
import { Header } from '@/components/cash/Header/Header';
import { DepositInfoSection } from '@/components/cash/DepositInfoSection/DepositInfoSection';
import { WarningsSection } from '@/components/cash/WarningsSection/WarningsSection';
import { BankInfoRow } from '@/components/cash/BankInfoRow/BankInfoRow';
import { EmailButton } from '@/components/cash/EmailButton/EmailButton';
import Toast, { BaseToast, ErrorToast, ToastConfig, BaseToastProps } from 'react-native-toast-message';
import { styles } from './styles';
import { VendorSelector } from '@/components/cash/VendorSelector/VendorSelector';
import { COLORS } from '@/styles/theme';

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: COLORS.toastBackground }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        color: COLORS.text,
        flexWrap: 'wrap',
      }}
      text1NumberOfLines={5}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 14,
        color: COLORS.text,
        flexWrap: 'wrap',
      }}
      text1NumberOfLines={5}
    />
  ),
};

const depositBullets = [
  'Minimum deposit of at least $50 USD',
  'Deposits are usually credited in 1–5 business days',
  'We charge zero deposit fee. Substantial fees may be applied by your bank, please check prior to sending',
  'To learn more, visit our https://help.crypto.com',
];

const warnings = [
  'The name on your bank account must match the name on your Crypto.com account.',
  'Deposit USD only. Non-USD deposits will be converted at prevalent conversion rates.',
  'Deposit from an account within Taiwan, Province of China only. Deposits from overseas bank account can lead to delayed returns and money loss due to intermediary bank fees.',
];

// Dummy Bank info sample
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
  {
    label: 'SWIFT/BIC',
    value: 'SCBLAEADXXX',
  },
];

const bankInfo2 = [
  { label: 'Payment Email', value: 'eTransfer.payper@crypto.com' },
  { label: 'Identification Numner', value: '123456789' },
];

export const DepositScreen: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<string>('Payper'); // Default to 'Payper' or your preferred default

  const handleSendInfo = () => {
    console.log('Send info button pressed');
  };

  // Renders each bank info row
  const renderBankInfoItem = ({ item }: { item: { label: string; value: string } }) => {
    return <BankInfoRow label={item.label} value={item.value} />;
  };

  const currentBankInfo = selectedVendor === 'Payper' ? bankInfo : bankInfo2;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="USD Bank Transfer" showBackButton />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Deposit Information Section */}
        <DepositInfoSection title="Deposit Information" bullets={depositBullets} />

        {/* Warnings Section */}
        <WarningsSection warnings={warnings} />

        <VendorSelector
          vendorOptions={['Payper', 'DC Bank']}
          selectedVendor="Payper"
          onVendorSelect={(vendor: string) => {
            console.log('Vendor selected:', vendor);
            setSelectedVendor(vendor);
          }}
        />

        <Text style={styles.infoNote}>
          Enter the information below into your banking app to transfer funds
          using SWIFT to your Crypto.com account
        </Text>

        {/* Rounded Card for Bank Info Rows */}
        <View style={styles.bankInfoCard}>
          <FlatList
            data={currentBankInfo}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderBankInfoItem}
            ItemSeparatorComponent={() => null}      // remove any default line separators
            scrollEnabled={false}                    // disable scroll to avoid nested scrolling
          />
        </View>
      </ScrollView>

      <View style={styles.bottomButton}>
        <EmailButton onPress={handleSendInfo} code='CDCW' timeout={10} />
      </View>

      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};
