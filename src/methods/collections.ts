import type * as Collection from '@/types/collections.ts'
import type * as Photo from '@/types/photos.ts'
import type {
    BaseMethod,
    InitParams,
    PaginationParams,
    RequiredArgsBaseMethod,
} from '@/types/request.ts'

import {
    fetcherConstructor,
    parseResponse,
    stringifyBody,
} from '@/helpers/utils.ts'

const COLLECTIONS_PATH_PREFIX = '/collections'

export default class Collections {
    private config: InitParams

    constructor(config: InitParams) {
        this.config = config
    }

    /**
     * Get a single page from the list of all collections.
     * @default { page: 1, per_page: 10 }
     */
    list: BaseMethod<Omit<PaginationParams, 'order_by'>, Collection.Basic[]> = (
        args,
        options,
    ) => {
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${COLLECTIONS_PATH_PREFIX}`,
            query: args,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch collections.',
        })
    }

    /**
     * Retrieve a single collection.
     * To view a user’s private collections, the `read_collections` scope is required.
     */
    get: RequiredArgsBaseMethod<Collection.CollectionId, Collection.Basic> = (
        args,
        options,
    ) => {
        const { collection_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${COLLECTIONS_PATH_PREFIX}/${
                encodeURIComponent(collection_id)
            }`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch collection.',
        })
    }

    /**
     * Retrieve a collection’s photos.
     */
    photos: RequiredArgsBaseMethod<
        Collection.CollectionId & Collection.PhotosParams,
        Collection.Photos
    > = (
        args,
        options,
    ) => {
        const { collection_id, ...params } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${COLLECTIONS_PATH_PREFIX}/${
                encodeURIComponent(collection_id)
            }/photos`,
            query: params,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch collection photos.',
        })
    }

    /**
     * Retrieve a list of collections related to this one.
     */
    related: RequiredArgsBaseMethod<
        Collection.CollectionId,
        Collection.Basic[]
    > = (
        args,
        options,
    ) => {
        const { collection_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${COLLECTIONS_PATH_PREFIX}/${
                encodeURIComponent(collection_id)
            }/related`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch collection related.',
        })
    }

    /**
     * Create a new collection.
     * This requires the `write_collections` scope.
     */
    create: RequiredArgsBaseMethod<
        Collection.CreateCollection,
        Collection.Basic
    > = (
        args,
        options,
    ) => {
        const respPromise = fetcherConstructor(this.config, {
            method: 'POST',
            endpoint: `${COLLECTIONS_PATH_PREFIX}`,
            body: stringifyBody(args),
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to create collection.',
        })
    }

    /**
     * Update an existing collection belonging to the logged-in user.
     * This requires the `write_collections` scope.
     */
    update: RequiredArgsBaseMethod<
        Collection.CollectionId & Collection.CreateCollection,
        Collection.Basic
    > = (
        args,
        options,
    ) => {
        const { collection_id, ...params } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'PUT',
            endpoint: `${COLLECTIONS_PATH_PREFIX}/${
                encodeURIComponent(collection_id)
            }`,
            body: stringifyBody(params),
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to update collection.',
        })
    }

    /**
     * Delete a collection belonging to the logged-in user.
     * This requires the `write_collections` scope.
     */
    delete: RequiredArgsBaseMethod<Collection.CollectionId, undefined> = (
        args,
        options,
    ) => {
        const { collection_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'DELETE',
            endpoint: `${COLLECTIONS_PATH_PREFIX}/${
                encodeURIComponent(collection_id)
            }`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to delete collection.',
        })
    }

    /**
     * Add a photo to one of the logged-in user’s collections.
     * Requires the `write_collections` scope.
     */
    addPhoto: RequiredArgsBaseMethod<
        Collection.CollectionId & Photo.PhotoId,
        {
            photo: Collection.Photos
            collection: Collection.Basic
        }
    > = (
        args,
        options,
    ) => {
        const { collection_id, photo_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'POST',
            endpoint: `${COLLECTIONS_PATH_PREFIX}/${
                encodeURIComponent(collection_id)
            }/add`,
            body: stringifyBody({ photo_id }),
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to add photo to collection.',
        })
    }

    /**
     * Remove a photo from one of the logged-in user’s collections.
     * Requires the `write_collections` scope.
     */
    removePhoto: RequiredArgsBaseMethod<
        Collection.CollectionId & Photo.PhotoId,
        {
            photo: Collection.Photos
            collection: Collection.Basic
        }
    > = (
        args,
        options,
    ) => {
        const { collection_id, photo_id } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'DELETE',
            endpoint: `${COLLECTIONS_PATH_PREFIX}/${
                encodeURIComponent(collection_id)
            }/remove`,
            body: stringifyBody({ photo_id }),
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to remove photo from collection.',
        })
    }
}
