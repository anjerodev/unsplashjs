import type { Range } from '@/helpers/typescript.ts'
import type { FetchResponse } from '@/types/response.ts'

export type ApiResponse<T> = T
export type RequestOptions = Omit<RequestInit, 'method' | 'body'>

type AccessConfig =
  | {
    /**
     * Only if using in server.
     * Your Unsplash Access Key.
     * You can find this on your [Unsplash Developer Dashboard](https://unsplash.com/oauth/applications).
     */
    accessKey: string
    apiUrl?: never
  }
  | {
    /** Only if using in client.
     * Proxy requests through your server to keep Access Key confidential as per API guidelines.
     */
    apiUrl: string
    accessKey?: never
  }

export type InitParams = AccessConfig & {
  /**
   * Currently only available "v1".
   */
  apiVersion?: string
  /**
   * Custom request options to be sent with every request.
   */
  requestOptions?: RequestOptions
}

export type FetcherOptions = {
  endpoint: string
  query?: Record<string, any>
} & RequestInit

export type BaseMethod<ArgsType, ReturnType> = (
  args?: ArgsType,
  options?: RequestOptions,
) => Promise<FetchResponse<ReturnType>>

export type RequiredArgsBaseMethod<ArgsType, ReturnType> = (
  args: ArgsType,
  options?: RequestOptions,
) => Promise<FetchResponse<ReturnType>>

export enum OrderBy {
  LATEST = 'latest',
  POPULAR = 'popular',
  VIEWS = 'views',
  DOWNLOADS = 'downloads',
  OLDEST = 'oldest',
}

export type Orientation = 'landscape' | 'portrait' | 'squarish'
export type OrientationParam = {
  orientation?: Orientation
}

export type PaginationParams = {
  /**
   * API defaults to `10` if no value is provided
   */
  per_page?: number
  /**
   * API defaults to `1` if no value is provided
   */
  page?: number
  /**
   * API defaults to `"latest"` if no value is provided
   */
  order_by?: OrderBy
}

export type StatsParams = {
  /**
   * The frequency of the stats. (Optional; default: “days”)
   * Currently, the only resolution param supported is “days”.
   */
  resolution?: 'days'
  /**
   * The amount of for each stat. (Optional; default: 30)
   * The quantity param can be any number between 1 and 30.
   */
  quantity?: Range<1, 30>
}
