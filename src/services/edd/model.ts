/* eslint-disable  @typescript-eslint/no-explicit-any */
import { GenericResponse } from '../generic'

export interface KycInfoSection {
  section_type: string
  section_id: string
  action: string
  status: string
}

export interface KycInfoAdditionalCollectionOverview extends GenericResponse {
  option_base_url: string
  intro: null | any
  overview: KycInfoSection[]
  next_section: KycInfoSection
}

export interface KycInfoOptionMeta {
  google_places_value?: string
  alpha3_code?: string
  [key: string]: any
}

export interface KycInfoOption {
  id: string
  value: string
  translation_key: string
  is_other: boolean
  meta?: KycInfoOptionMeta
}

export interface KycInfoOptionsResponse {
  items: KycInfoOption[]
}

export interface KycInfoField {
  question_id: string
  component: string
  name: string
  input_type: 'inline_selection' | 'external_selection' | 'text' | 'checkbox' | 'read_only'
  field_title_translation_key: string | null
  field_description_translation_key: string | null
  field_placeholder_translation_key: string | null
  required: boolean
  options?: KycInfoOption[]
  max_select?: number
  searchbar_enabled?: boolean
  options_key?: string
  answers?: KycInfoOption[]
  regex?: string
  regex_error_translation_key?: string
  visibility_rule?: string
}

export interface KycInfoAnswerTitle {
  key: string
  args: any[]
}

export interface KycInfoAnswerOption {
  id: string
  value: string
  translation_key: string | null
  title: KycInfoAnswerTitle
  is_other: boolean
  user_input: string | null
  skip_section_ids: string[]
  meta: Record<string, any>
}

export interface KycInfoQuestionAnswer {
  question_id: string
  field_name: string
  field_answer?: string
  field_answers?: KycInfoAnswerOption[]
}

export interface KycInfoResultPage {
  display_type: 'polling' | 'fullscreen_pending'
  type?: string
  small_line_translation_key: string
  key_message_translation_key: string
  max_attempts?: number
  interval_millis?: number
}

export interface KycInfoQuestionSubmitRequest {
  triggered_by: string
  section_id: string
  context: Record<string, any>
  answers: KycInfoQuestionAnswer[]
}

export interface KycInfoQuestionSubmitResponse extends GenericResponse {
  result_page: KycInfoResultPage | null
  next_section?: KycInfoSection
  next_triggered_by: string | null
}

export interface KycInfoPollingResponse extends GenericResponse {
  result_page: KycInfoResultPage
  next_section: KycInfoSection | null
  next_triggered_by: string | null
  has_result: boolean
}

export interface KycInfoAdditionalCollectionQuestion extends GenericResponse {
  section_type: string
  section_id: string
  section_title_translation_key: string | null
  section_description_translation_key: string | null
  section_cta_button_translation_key: string | null
  fields: KycInfoField[]
  next_section?: KycInfoSection
}