export const currencyDecimals: { [key: string]: number } = {
  USD: 2,
  EUR: 2,
  CAD: 2,
  JPY: 0,
};

export const formatAmount = (value: number, currency: string): string => {
  const decimals = currencyDecimals[currency] || 2;
  return value.toFixed(decimals);
};
