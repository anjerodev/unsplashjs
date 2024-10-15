import type * as Photo from '@/types/photos.ts'
import type { FetchResponse } from '@/types/response.ts'
import type {
    BaseMethod,
    InitParams,
    PaginationParams,
    RequestOptions,
    RequiredArgsBaseMethod,
    StatsParams,
} from '@/types/request.ts'

import {
    fetcherConstructor,
    parseResponse,
    stringifyBody,
} from '@/helpers/utils.ts'
import type { Range } from '@/helpers/typescript.ts'

const PHOTOS_PATH_PREFIX = '/photos'

export default class Photos {
    private config: InitParams

    constructor(config: InitParams) {
        this.config = config
    }

    /**
     * Get a single page from the Editorial feed.
     * @default { page: 1, per_page: 10 }
     */
    list: BaseMethod<Omit<PaginationParams, 'order_by'>, Photo.Basic[]> = (
        args,
        options,
    ) => {
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${PHOTOS_PATH_PREFIX}`,
            query: args,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch photos.',
        })
    }

    /**
     * Retrieve a single photo.
     */
    get: RequiredArgsBaseMethod<Photo.PhotoId, Photo.Full> = (
        args,
        options,
    ) => {
        const { photo_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${PHOTOS_PATH_PREFIX}/${photo_id}`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch photo.',
        })
    }

    /**
     * Retrieve a single or a group of random photos, given optional filters.
     * @default {count: 1}
     */
    getRandom(
        args: Photo.RandomParams & { count: Range<2, 30> },
        options?: RequestOptions,
    ): Promise<FetchResponse<Photo.Random[]>>
    getRandom(
        args?: Photo.RandomParams,
        options?: RequestOptions,
    ): Promise<FetchResponse<Photo.Full>>
    getRandom(
        args?: Photo.RandomParams,
        options?: RequestOptions,
    ) {
        const { collections, topics, ...params } = args ?? {}
        const { headers, ...restOptions } = options ?? {}

        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${PHOTOS_PATH_PREFIX}/random`,
            query: {
                ...params,
                collections: collections?.join(','),
                topics: topics?.join(','),
            },
            headers: {
                /**
                 * Avoid response caching
                 */
                'cache-control': 'no-cache',
                ...headers,
            },
            ...restOptions,
        })

        if (args?.count && args.count > 1) {
            return parseResponse<Photo.Random[]>(respPromise, {
                errorMessage: 'Failed to fetch random photos.',
            })
        }

        return parseResponse<Photo.Full>(respPromise, {
            errorMessage: 'Failed to fetch random photo.',
        })
    }

    /**
     * Retrieve total number of downloads, views and likes of a single photo, as well as the historical breakdown of these stats in a specific time-frame ("quantity", from 1 to 30 days).
     * @default { quantity: 30 }
     */
    stats: RequiredArgsBaseMethod<Photo.PhotoId & StatsParams, Photo.Stats> = (
        args,
        options,
    ) => {
        const { photo_id, ...params } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${PHOTOS_PATH_PREFIX}/${photo_id}/statistics`,
            query: params,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch photo.',
        })
    }

    /**
     * This is purely an event endpoint used to increment the number of downloads a photo has.
     * https://help.unsplash.com/api-guidelines/guideline-triggering-a-download
     */
    trackDownload: RequiredArgsBaseMethod<Photo.PhotoId, { url: string }> = (
        args,
        options,
    ) => {
        const { photo_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${PHOTOS_PATH_PREFIX}/${photo_id}/download`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to track download.',
        })
    }

    /**
     * Update a photo on behalf of the logged-in user.
     * This requires the `write_photos` scope.
     */
    update: RequiredArgsBaseMethod<Photo.UpdatePhoto, Photo.Basic> = (
        args,
        options,
    ) => {
        const { id: photo_id, ...data } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'PUT',
            endpoint: `${PHOTOS_PATH_PREFIX}/${photo_id}`,
            body: stringifyBody(data),
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to update photo.',
        })
    }

    /**
     * Like a photo on behalf of the logged-in user.
     * This requires the `write_likes` scope.
     */
    like: RequiredArgsBaseMethod<Photo.PhotoId, Photo.Basic> = (
        args,
        options,
    ) => {
        const { photo_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'POST',
            endpoint: `${PHOTOS_PATH_PREFIX}/${photo_id}/like`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to like photo.',
        })
    }

    /**
     * Remove a user’s like of a photo.
     * This requires the `write_likes` scope.
     */
    unlike: RequiredArgsBaseMethod<Photo.PhotoId, Photo.Basic> = (
        args,
        options,
    ) => {
        const { photo_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'DELETE',
            endpoint: `${PHOTOS_PATH_PREFIX}/${photo_id}/like`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to unlike photo.',
        })
    }
}
