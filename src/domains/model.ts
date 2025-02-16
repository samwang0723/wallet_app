export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  phone: string;
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
  bankAddress?: string;
  accountNumber: string;
  accountName: string;
  accountAddress?: string;
}

export interface PaymentNetwork {
  id: string;
  type: string;
  description: string;
  title: string;
  recommended?: boolean;
  iconName: string;
}

export interface WithdrawalInfo {
  currency: string;
  amount: number;
  method: string;
  bankAccount: BankAccount;
  fee: number;
  receiveAmount: number;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  // Add other state properties as needed
}
