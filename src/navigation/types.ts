export interface Transaction {
  id: string;
  title: string;
  date: string;
  status: string;
  amount: string;
  isPositive?: boolean;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface WithdrawalInfo {
  currency: string;
  amount: number;
  method: string;
  bankAccount: BankAccount;
  fee: number;
  receiveAmount: number;
}

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
};
