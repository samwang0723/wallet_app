import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Header } from '@/components/cash/Header/Header';
import { DepositInfoSection } from '@/components/cash/DepositInfoSection/DepositInfoSection';
import { WarningsSection } from '@/components/cash/WarningsSection/WarningsSection';
import { BankInfoRow } from '@/components/cash/BankInfoRow/BankInfoRow';
import { EmailButton } from '@/components/cash/EmailButton/EmailButton';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  BaseToastProps,
} from 'react-native-toast-message';
import { VendorSelector } from '@/components/cash/VendorSelector/VendorSelector';
import { theme } from '@/themes';
import Text from '@/components/ui/Text';

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: theme.colors.toastBackground }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: theme.fontSizes.md,
        color: theme.colors.text,
        flexWrap: 'wrap',
      }}
      text1NumberOfLines={5}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: theme.fontSizes.md,
        color: theme.colors.text,
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
  'To learn more, visit our (Help Center)https://help.crypto.com',
];

const warnings = [
  'The name on your bank account must match the name on your Crypto.com account.',
  'Deposit USD only. Non-USD deposits will be converted at prevalent conversion rates.',
  'Deposit from an account within Taiwan, Province of China only. Deposits from overseas bank account can lead to delayed returns and money loss due to intermediary bank fees.',
];

const warnings2 = [
  'The name on your bank account must match the name on your Crypto.com account.',
  'You must include the Identification Number below in your bank transfer for us to identify your deposit (Test)http://www.google.com. If you made a deposit but forgot to include it or made a mistake? (Tap here)https://help.crypto.com',
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

const vendorOptions = ['Payper', 'DC Bank'];

export const DepositScreen: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<string>(
    vendorOptions[0]
  );

  const handleSendInfo = () => {
    console.log('Send info button pressed');
  };

  const renderBankInfoItem = ({
    item,
  }: {
    item: { label: string; value: string };
  }) => {
    return <BankInfoRow label={item.label} value={item.value} />;
  };

  const currentBankInfo =
    selectedVendor === vendorOptions[0] ? bankInfo : bankInfo2;
  const currentWarnings =
    selectedVendor === vendorOptions[0] ? warnings : warnings2;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Header title="USD Bank Transfer" showBackButton />
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: theme.colors.background }}
        showsVerticalScrollIndicator={false}
      >
        {/* Deposit Information Section */}
        <DepositInfoSection
          title="Deposit Information"
          bullets={depositBullets}
        />

        {/* Warnings Section */}
        <WarningsSection warnings={currentWarnings} />

        <VendorSelector
          vendorOptions={vendorOptions}
          selectedVendor={vendorOptions[0]}
          onVendorSelect={(vendor: string) => {
            setSelectedVendor(vendor);
          }}
        />

        <Text variant="md" color="text" className="mx-4 pt-2 pb-4">
          Enter the information below into your banking app to transfer funds
          using SWIFT to your Crypto.com account
        </Text>

        {/* Rounded Card for Bank Info Rows */}
        <View
          className="mx-4 my-1 rounded-lg overflow-hidden"
          style={{ backgroundColor: theme.colors.cardBackground }}
        >
          <FlatList
            data={currentBankInfo}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderBankInfoItem}
            ItemSeparatorComponent={() => null}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <View className="px-4 pt-1 pb-4">
        <EmailButton onPress={handleSendInfo} code="CDCW" timeout={10} />
      </View>

      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};
