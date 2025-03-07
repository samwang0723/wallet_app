/* eslint-disable  @typescript-eslint/no-explicit-any */

import { GenericResponse } from "../generic"

export interface WithdrawalInfo {
  currency: string
  amount: number
  method: string
  bankAccount: BankAccount
  fee: number
  receiveAmount: number
}

// Define the structure of each currency item
export interface Currency {
  id: string
  symbol: string
  name: string
  supporting_viban_types: string[]
  code: string
  position: number // adjust type if necessary
  features: string[]
  can_withdraw: boolean
  can_deposit: boolean
}

// Define the viban interface, including other properties if needed
export interface Viban {
  ar_debin_enabled: boolean
  br_cmp_enabled: boolean
  br_doc_enabled: boolean
  br_pix_enabled: boolean
  br_ted_enabled: boolean
  brl_wallet_enabled: boolean
  ca_interac_etransfer_enabled: boolean
  crypto_viban_enabled: boolean
  currencies: Currency[]
  // add additional properties as needed
}

// Define the structure of the app configuration
// Cash Wallet related interfaces
export interface Money {
  currency: string
  amount: string
}

export interface Fees {
  year_to_date: Money
  last_month: Money
}

export interface VibanType {
  type: string
  name: string
  symbol: string
  currency: string
  state: string
  amount: Money
  native_amount: Money
  // Optional properties (may not exist on every viban type)
  enabled_viban_types?: string[]
  current?: string
  pending?: string
  native_currency?: string
  total_amount?: string
  reactivation_required?: boolean
}

export interface VibanBalance {
  enabled_viban_types: string[]
  currency: string
  amount: Money
  native_amount: Money
  total_amount: Money
  unsettled_amount: Money
  settled_amount: Money
}

export interface CashWallet {
  id: string
  type: string
  currency: string
  amount: Money
  native_amount: Money
  total_amount: Money
  account_details: string
  unsettled_amount: Money
  settled_amount: Money
}

export interface VibanAccount {
  fees: Fees
  balance: Money
  native_balance: Money
  viban_types: VibanType[]
  balances: VibanBalance[]
  cash_wallets: CashWallet[]
}

export interface VibanAccountSummary extends GenericResponse {
  account: VibanAccount
}

export interface Transactions extends GenericResponse {
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  context: string
  icon: string
  nature: string
  kind: string
  description: string
  rate: string
  rate_desc: string
  amount: Money
  to_amount: Money
  native_amount: Money
  status: string
  created_at: string // Consider using Date if you plan to parse these timestamps
  updated_at: string
  meta: TransactionMeta
  source_type: string
  source_id: string
}

export interface TransactionMeta {
  rate_source: string
  trade_model: string
  trading_fee: Money
  strategy_type: string
  filled_to_amount: string
  placed_from_amount: string
  return_from_amount: string
  estimated_to_amount: string
  cumulative_trade_fee: string
  executed_from_amount: string
  quotation_product_code: string
  trading_fee_percentage: string
  cumulative_filled_to_amount: string
  cumulative_executed_from_amount: string
  review_time_description: string | null
  bank_transfer_time_description: string | null
}

export interface TranslationContent {
  translation_key: string
  translation_payload: string[]
}

export interface PaymentNetworkDetail {
  id: string
  type: string
  tags: string[]
  description: TranslationContent
  title?: TranslationContent
}

export interface PaymentNetwork {
  currency: string
  deposit_push_payment_networks: string[]
  deposit_pull_payment_networks: string[]
  withdrawal_payment_networks: string[]
  deposits: PaymentNetworkDetail[]
  withdrawals: PaymentNetworkDetail[]
  deposit_footers: TranslationContent[]
  withdrawal_footers: TranslationContent[]
}

export interface PaymentNetworks extends GenericResponse {
  available_payment_networks: PaymentNetwork[]
}

export interface BankDetail {
  key: string
  translation_key: string
  value: string
}

export interface Vendor {
  vendor_id: string
  vendor_name_translation_key: string
  state: string
  bank_details: BankDetail[]
  warnings: TranslationContent[]
}

export interface DepositMethod {
  deposit_method: string
  deposit_method_name_translation_key: string
  deposit_method_description_translation_key: string
  multi_vendor_explainer: TranslationContent
  type: string
  user_uuid: string
  currency: string
  bank_details: BankDetail[]
  bank_list: any | null // Update the type if you know its structure
  vendor_list: Vendor[]
  bullet_points: TranslationContent[]
  warnings: TranslationContent[]
  instructions: TranslationContent[]
  meta: any | null // Update the type if known
  limits: any | null // Update the type if known
  fees: any | null // Update the type if known
}

export interface DepositMethods extends GenericResponse {
  deposit_methods: DepositMethod[]
}

export interface BankInfoMailResponse extends GenericResponse {
  bank_info_email: {
    viban_type: string
    currency: string
    verification_code: string
    cooldown_in_seconds: number
  }
}

export interface BankAccount {
  id: string
  account_id: string
  status: string
  currency: string
  bank_name: string
  account_identifier_type: string
  account_identifier_value: string
  instant_buy_enabled: boolean
  account_holder_name: string
  deposit_pull_payment_networks: string[]
  deposit_push_payment_networks: string[]
  withdrawal_payment_networks: string[]
  masked_account_identifier_value: string
}

export interface Overview {
  can_add_bank_account: boolean
  add_bank_account_method: string
  third_party_provider: string
  max_bank_account_reached: boolean
  subsequent_pages_dynamic: boolean
}

export interface BankAccountsResponse extends GenericResponse {
  bank_accounts: BankAccount[]
  overview: Overview
}

export interface WithdrawalProcessDetails extends GenericResponse {
  details: {
    currency: string
    viban_type: string
    minimum_withdrawal_amount_in_usd: Money
    monthly_quota_in_usd: Money
    daily_quota_in_usd: Money
    used_daily_quota_in_usd: Money
    used_monthly_quota_in_usd: Money
    minimum_withdrawal_amount: Money
    monthly_quota: Money
    daily_quota: Money
    used_daily_quota: Money
    used_monthly_quota: Money
    remaining_daily_quota: Money
    remaining_monthly_quota: Money
    remaining_daily_quota_in_usd: Money
    remaining_monthly_quota_in_usd: Money
    network_name: string
    review_time_description: string
    bank_transfer_time_description: string
    had_deposited: boolean
    had_withdrawn: boolean
    fees: any[]
    fee_amount: Money | null
    fee_label: TranslationContent
    transactions_per_day: number
    transactions_per_month: number
    transactions_daily_count: number
    transactions_monthly_count: number
    remaining_transactions_daily_count: number
    remaining_transactions_monthly_count: number
    beneficiaries_count: number
    beneficiaries_max: number
    maximum_withdrawal_amount: Money | null
    maximum_withdrawal_amount_in_usd: Money | null
    can_add_bank_account: boolean
    can_delete_bank_account: boolean
    max_bank_accounts: number | null
  }
}

export interface FaqResponse extends GenericResponse {
  url: string
}

interface Terms {
  term_title: TranslationContent
  terms_item: TranslationContent[]
}

export interface ApplicationOverviewDetail {
  title: TranslationContent
  description: TranslationContent
  bullet_points: TranslationContent[]
  terms: Terms | null
  footers: TranslationContent[]
}

export interface ApplicationOverviewResponse extends GenericResponse {
  status: string
  overview: ApplicationOverviewDetail
  application_flow: string
}

export interface CreateWalletButton {
  title_key: string
  action: string
  params?: {
    triggered_by: string
    plugin_ids: string[]
  }
}

export interface CreateWalletEdd {
  display_type: string
  dismissible: boolean
  header_key: string
  subheader_key: string
  primary_button: CreateWalletButton
  secondary_button: CreateWalletButton
}

export interface CreateWalletAdditionalInfo {
  triggered_by: string
  edd: CreateWalletEdd
  restricted_features: string
}

export interface CreateWalletResponse {
  ok: boolean
  error?: string
  error_message?: string
  meta?: {
    triggered_by: string
    edd: CreateWalletEdd
    restricted_features: string
  }
  additional_info?: CreateWalletAdditionalInfo
}