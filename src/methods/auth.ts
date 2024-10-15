import type * as Authorization from '@/types/auth.ts'
import type { InitParams, RequiredArgsBaseMethod } from '@/types/request.ts'
import {
    fetcherConstructor,
    parseResponse,
    stringifyBody,
} from '@/helpers/utils.ts'

export const OAUTH_AUTHORIZE_URL = 'https://unsplash.com/oauth/authorize'
export const OAUTH_TOKEN_PATH_PREFIX = '/oauth/token'

export default class Auth {
    private config: InitParams

    constructor(config: InitParams) {
        this.config = config
    }

    getAuthenticationUrl(
        args: Authorization.AuthorizationParams,
    ) {
        const { scope = ['public'], response_type = 'code', redirect_uri } =
            args

        if (!this.config?.accessKey) {
            return undefined
        }

        const params = new URLSearchParams()
        params.set('client_id', this.config.accessKey)
        params.set('redirect_uri', redirect_uri)
        params.set('response_type', response_type)
        params.set('scope', scope.join('+'))

        return `${OAUTH_AUTHORIZE_URL}?${params.toString()}`
    }

    userAuthentication: RequiredArgsBaseMethod<
        Authorization.OAuthParams,
        Authorization.AuthorizationResponse
    > = (
        args,
        options,
    ) => {
        const { grant_type = 'authorization_code', ...params } = args
        const respPromise = fetcherConstructor(this.config, {
            method: 'POST',
            endpoint: OAUTH_TOKEN_PATH_PREFIX,
            body: stringifyBody({
                client_id: this.config.accessKey,
                grant_type,
                ...params,
            }),
            ...options,
        })
        return parseResponse(respPromise, {
            errorMessage: 'Failed to authorize.',
        })
    }
}
