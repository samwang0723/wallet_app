import { BankAccount, PaymentNetwork, Transaction, WithdrawalInfo } from "@/store/types";

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
};
