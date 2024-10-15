import type * as Stat from '@/types/stats.ts'
import type { BaseMethod, InitParams } from '@/types/request.ts'

import { fetcherConstructor, parseResponse } from '@/helpers/utils.ts'

const STATS_PATH_PREFIX = '/stats'

export default class Stats {
    private config: InitParams

    constructor(config: InitParams) {
        this.config = config
    }

    /**
     * Get a list of counts for all of Unsplash.
     */
    total: BaseMethod<never, Stat.Total> = (
        _,
        options,
    ) => {
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${STATS_PATH_PREFIX}/total`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch total stats.',
        })
    }
    /**
     * Get the overall Unsplash stats for the past 30 days.
     */
    month: BaseMethod<never, Stat.Month> = (
        _,
        options,
    ) => {
        const respPromise = fetcherConstructor(this.config, {
            method: 'GET',
            endpoint: `${STATS_PATH_PREFIX}/month`,
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to fetch monthly stats.',
        })
    }
}
