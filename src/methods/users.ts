import type * as User from '@/types/users.ts'
import type {
    BaseMethod,
    InitParams,
    PaginationParams,
    RequiredArgsBaseMethod,
    StatsParams,
} from '@/types/request.ts'

import {
    fetcherConstructor,
    parseResponse,
    stringifyBody,
} from '@/helpers/utils.ts'

const USERS_PATH_PREFIX = '/users'

export default class Users {
    private config: InitParams

    constructor(config: InitParams) {
        this.config = config
    }

    /**
     * To access a user’s private data, the user is required to authorize the `read_user` scope.
     */
    getCurrent: BaseMethod<never, User.Current> = (_, options) => {
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: '/me',
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch current user.',
        })
    }

    /**
     * This action requires the `write_user` scope.
     */
    updateCurrent: BaseMethod<User.UpdateCurrent, User.Current> = (
        args,
        options,
    ) => {
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'PUT',
                endpoint: `/me`,
                body: stringifyBody(args),
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to update current user.',
        })
    }

    /**
     * Retrieve public details on a given user.
     */
    get: RequiredArgsBaseMethod<User.Username, User.Full> = (args, options) => {
        const { username } = args
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${USERS_PATH_PREFIX}/${username}`,
                ...options,
            },
        })
        return parseResponse<User.Full>(respPromise, {
            errorMessage: 'Failed to fetch user.',
        })
    }

    /**
     * Retrieve a single user’s portfolio link.
     */
    portfolio: RequiredArgsBaseMethod<User.Username, { url: string }> = (
        args,
        options,
    ) => {
        const { username } = args
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${USERS_PATH_PREFIX}/${username}/portfolio`,
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch user portfolio.',
        })
    }

    /**
     * Get a list of photos uploaded by a user.
     */
    photos: RequiredArgsBaseMethod<
        User.PhotosWithStatsParams,
        User.UserPhotos
    > = (
        args,
        options,
    ) => {
        const { username, ...params } = args
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${USERS_PATH_PREFIX}/${username}/photos`,
                query: params,
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch user photos.',
        })
    }

    /**
     * Get a list of photos liked by a user.
     */
    likedPhotos: RequiredArgsBaseMethod<
        User.PhotosParams,
        User.UserPhotos
    > = (
        args,
        options,
    ) => {
        const { username, ...params } = args
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${USERS_PATH_PREFIX}/${username}/likes`,
                query: params,
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch user liked photos.',
        })
    }

    /**
     * Get a list of collections created by the user.
     */
    collections: RequiredArgsBaseMethod<
        User.Username & Omit<PaginationParams, 'order_by'>,
        User.UserCollections
    > = (
        args,
        options,
    ) => {
        const { username, ...params } = args
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${USERS_PATH_PREFIX}/${username}/collections`,
                query: params,
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch user collections.',
        })
    }

    /**
     * Retrieve the consolidated number of downloads, views and likes of all user’s photos, as well as the historical breakdown and average of these stats in a specific time-frame ("quantity", from 1 to 30 days).
     * @default { quantity: 30 }
     */
    stats: RequiredArgsBaseMethod<User.Username & StatsParams, User.Stats> = (
        args,
        options,
    ) => {
        const { username, ...params } = args
        const respPromise = fetcherConstructor({
            config: this.config,
            options: {
                method: 'GET',
                endpoint: `${USERS_PATH_PREFIX}/${username}/statistics`,
                query: params,
                ...options,
            },
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch user stats.',
        })
    }
}
