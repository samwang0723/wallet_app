import {
  BankAccount,
  PaymentNetwork,
  Transaction,
  WithdrawalInfo,
} from '@/domains/model';

export type RootStackParamList = {
  Home: undefined;
  Deposit: undefined;
  Transaction: {
    transactions: Transaction[];
  };
  ChooseBankAccount: {
    bankAccounts: BankAccount[];
  };
  InitWithdrawal: {
    currency: string;
  };
  WithdrawInfo: undefined;
  ConfirmWithdrawal: {
    withdrawalInfo: WithdrawalInfo;
  };
  PaymentNetwork: {
    paymentNetworks: PaymentNetwork[];
  };
  SelectionList: {
    currentValue?: string;
  };
  AddressSearch: undefined;
};
