export type ErrorType = {
  message: string
  details?: string
  hint?: string
  code?: string | number
  name?: string
}

export interface ResponseSuccess<T> {
  data: T
  error?: undefined
  total?: number
}
export interface ResponseFailure {
  error: ErrorType
  data?: undefined
  total?: undefined
}

export type FetchResponse<T> = ResponseSuccess<T> | ResponseFailure
