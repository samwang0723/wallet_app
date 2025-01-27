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
