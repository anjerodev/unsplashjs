import * as SearchT from '@/types/search.ts'
import type { BaseMethod, InitParams } from '@/types/request.ts'

import { fetcherConstructor, parseResponse } from '@/helpers/utils.ts'

const SEARCH_PATH_PREFIX = '/search'

export default class Search {
    private config: InitParams

    constructor(config: InitParams) {
        this.config = config
    }

    /**
     * Get a single page of photo results for a query.
     */
    photos: BaseMethod<SearchT.SearchPhotosParams, SearchT.Photos> = (
        args,
        options,
    ) => {
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${SEARCH_PATH_PREFIX}/photos`,
                query: args,
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch search photos.',
        })
    }

    /**
     * Get a single page of collection results for a query.
     */
    collections: BaseMethod<SearchT.SearchParams, SearchT.Collections> = (
        args,
        options,
    ) => {
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${SEARCH_PATH_PREFIX}/collections`,
                query: args,
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch search collections.',
        })
    }
    /**
     * Get a single page of user results for a query.
     */
    users: BaseMethod<SearchT.SearchParams, SearchT.Users> = (
        args,
        options,
    ) => {
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${SEARCH_PATH_PREFIX}/users`,
                query: args,
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch search users.',
        })
    }
}
