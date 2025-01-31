export interface BankInfo {
  label: string;
  value: string;
}

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

export type RootStackParamList = {
  Home: undefined; // Example, adjust based on your app
  Deposit: undefined; // Example, adjust based on your app
  Transaction: {
    transactions: Transaction[];
  };
  ChooseBankAccount: {
    bankAccounts: BankAccount[];
  };
  InitWithdrawal: undefined;
  WithdrawInfo: undefined;
};
