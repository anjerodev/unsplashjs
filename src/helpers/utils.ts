import type { FetcherOptions, InitParams } from '@/types/request.ts'
import type { FetchResponse } from '@/types/response.ts'
import { isDefined } from '@/helpers/typescript.ts'

export function fetcherConstructor(
    {
        config: {
            accessKey,
            apiUrl = 'https://api.unsplash.com',
            apiVersion = 'v1',
            requestOptions = {},
        },
        options: {
            method = 'GET',
            endpoint,
            query,
            ...options
        },
    }: {
        config: InitParams
        options: FetcherOptions
    },
) {
    const url = new URL(`${apiUrl}${endpoint}`)

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
        requestOptions

    /**
     * Options passed when making a request
     */
    const { headers: extraHeaders, ...extraOptions } = options

    const headers = new Headers({
        'Accept-Version': apiVersion,
        ...extraGeneralHeaders,
        ...extraHeaders,
    })

    if (isDefined(accessKey)) {
        headers.append('Authorization', `Client-ID ${accessKey}`)
    }

    console.dir({
        finalOptions: {
            method,
            headers,
            ...extraGeneralOptions,
            ...extraOptions,
        },
    }, { depth: null })

    return fetch(url, {
        method,
        headers,
        ...extraGeneralOptions,
        ...extraOptions,
    })
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
