import type { FetcherOptions, InitParams } from '@/types/request.ts'
import type { FetchResponse } from '@/types/response.ts'
import { isDefined } from '@/helpers/typescript.ts'
import { assertNotEquals } from '@std/assert'
import {
    type MatchRequestOptions,
    mockFetch,
    resetFetch,
} from '@c4spar/mock-fetch'
import { API_URL } from '@/helpers/constants.ts'

export function fetchOptionsConstructor({
    accessKey,
    apiUrl,
    apiVersion = 'v1',
    endpoint,
    query,
    method = 'GET',
    initRequestOptions = {},
    requestOptions = {},
}: {
    accessKey?: string
    apiUrl?: string
    apiVersion?: string
    endpoint: string
    query?: Record<string, any>
    method?: RequestInit['method']
    initRequestOptions?: RequestInit
    requestOptions?: RequestInit
}) {
    const url = new URL(`${apiUrl || API_URL}${endpoint}`)

    if (query) {
        for (const [key, value] of Object.entries(query)) {
            if (isDefined(value)) {
                url.searchParams.append(key, value)
            }
        }
    }

    /**
     * Options passed when initializing the client
     */
    const { headers: extraGeneralHeaders, ...extraGeneralOptions } =
        initRequestOptions

    /**
     * Options passed when making a request
     */
    const { headers: extraHeaders, ...extraOptions } = requestOptions

    const headers = new Headers({
        'Accept-Version': apiVersion,
        ...extraGeneralHeaders,
        ...extraHeaders,
    })

    if (isDefined(accessKey)) {
        headers.append('Authorization', `Client-ID ${accessKey}`)
    }

    return {
        url,
        options: {
            method,
            headers,
            ...extraGeneralOptions,
            ...extraOptions,
        },
    }
}

export function fetcherConstructor(
    config: InitParams,
    fetcherOptions: FetcherOptions,
) {
    const { requestOptions: initRequestOptions, ...restConfig } = config
    const { endpoint, query, method, ...restOptions } = fetcherOptions

    const { url, options } = fetchOptionsConstructor({
        ...restConfig,
        initRequestOptions,
        endpoint,
        query,
        method,
        requestOptions: restOptions,
    })

    return fetch(url, options)
}

export async function parseResponse<T>(
    responsePromise: Promise<Response>,
    options?: { errorMessage?: string },
): Promise<FetchResponse<T>> {
    try {
        const resp = await responsePromise

        if (!resp.ok) {
            throw {
                message: options?.errorMessage ??
                    'There was an error fetching the data',
                hint: resp.statusText,
            }
        }

        const data: T = await resp.json()
        return { data }
    } catch (error: any) {
        return {
            error: { message: error.message, ...error },
        }
    }
}

export function stringifyBody(body: Record<string, any> | undefined) {
    if (body) {
        return JSON.stringify(
            body,
            (_, value) => isDefined(value) ? value : undefined,
        )
    }
}

export async function mockAndAssert({
    endPoint,
    method = 'get',
    body,
    searchParams,
    requestFn,
}: {
    endPoint: string
    method?: 'get' | 'post' | 'put' | 'delete'
    body?: Record<string, any>
    searchParams?: Record<string, string>
    requestFn: () => Promise<{ data?: any; error?: any }>
}) {
    // Mock fetch with the provided URL and response
    const url = new URL(`${API_URL}${endPoint}`)
    const params = new URLSearchParams(searchParams)
    url.search = params.toString()

    // console.log({ url: url.toString() })

    const matchOptions: MatchRequestOptions = {
        url: url.toString(),
        method,
    }

    if (body) {
        matchOptions.body = JSON.stringify(body)
    }

    mockFetch(matchOptions)

    await requestFn()

    assertNotEquals(mockFetch, undefined)
    resetFetch()
}
