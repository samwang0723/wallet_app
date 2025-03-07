export interface GenericResponse {
  ok: boolean
  error?: {
    message: string
  }
  error_message?: string
}