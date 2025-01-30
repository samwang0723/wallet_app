import React from 'react';
import { View, ScrollView, SafeAreaView, Text, FlatList } from 'react-native';
import { Header } from '@/components/cash/Header/Header';
import { DepositInfoSection } from '@/components/cash/DepositInfoSection/DepositInfoSection';
import { WarningsSection } from '@/components/cash/WarningsSection/WarningsSection';
import { BankInfoRow } from '@/components/cash/BankInfoRow/BankInfoRow';
import { EmailButton } from '@/components/cash/EmailButton/EmailButton';
import Toast, { BaseToast, ErrorToast, ToastConfig, BaseToastProps } from 'react-native-toast-message';
import { styles } from './styles';
import { VendorSelector } from '@/components/cash/VendorSelector/VendorSelector';

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: '#333' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        color: '#fff',
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
        color: '#fff',
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
  {
    label: 'SWIFT/BIC',
    value: 'SCBLAEADXXX',
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
          }}
        />

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
        <EmailButton onPress={handleSendInfo} code='1234' />
      </View>

      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};
