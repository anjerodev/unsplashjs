import type * as Topic from '@/types/topics.ts'
import type {
    BaseMethod,
    InitParams,
    OrientationParam,
    PaginationParams,
    RequiredArgsBaseMethod,
} from '@/types/request.ts'

import { fetcherConstructor, parseResponse } from '@/helpers/utils.ts'

const TOPICS_PATH_PREFIX = '/topics'

export default class Topics {
    private config: InitParams

    constructor(config: InitParams) {
        this.config = config
    }

    /**
     * Get a single page from the list of all topics.
     * the param `ids` also accept topic slugs
     */
    list: BaseMethod<Topic.ListParams, Topic.Basic[]> = (args, options) => {
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${TOPICS_PATH_PREFIX}`,
            query: {
                ...args,
                ids: args?.ids?.join(','),
            },
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch topics.',
        })
    }

    /**
     * Retrieve a single topic.
     */
    get: RequiredArgsBaseMethod<Topic.IdOrSlugParam, Topic.Full> = (
        args,
        options,
    ) => {
        const { id_or_slug } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${TOPICS_PATH_PREFIX}/${encodeURIComponent(id_or_slug)}`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch topic.',
        })
    }

    /**
     * Retrieve a topic’s photos.
     */
    photos: RequiredArgsBaseMethod<
        Topic.IdOrSlugParam & PaginationParams & OrientationParam,
        Topic.Photos[]
    > = (
        args,
        options,
    ) => {
        const { id_or_slug, ...params } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${TOPICS_PATH_PREFIX}/${
                encodeURIComponent(id_or_slug)
            }/photos`,
            query: params,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch topic photos.',
        })
    }
}
