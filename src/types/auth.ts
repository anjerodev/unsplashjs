export type AuthorizationScope =
    | 'public'
    | 'read_user'
    | 'write_user'
    | 'read_photos'
    | 'write_photos'
    | 'write_likes'
    | 'write_followers'
    | 'read_collections'
    | 'write_collections'

export interface AuthorizationParams {
    /**
     * A URI you control that handles successful user authorization.
     */
    redirect_uri: string
    /**
     * The access response type you are requesting. The authorization workflow Unsplash supports requires the value “code” here.
     */
    response_type?: 'code'
    /**
     * A list of requested scopes.
     */
    scope?: AuthorizationScope[]
}

export interface OAuthParams {
    /**
     * 	Your application’s secret key.
     * You can find this on your [Unsplash Developer Dashboard](https://unsplash.com/oauth/applications).
     */
    client_secret: string
    /**
     * 	Your application’s redirect URI.
     */
    redirect_uri: string
    /**
     * The authorization code supplied to the callback by Unsplash.
     */
    code: string
    grant_type?: 'authorization_code'
}

export interface AuthorizationResponse {
    access_token: string
    token_type: 'bearer'
    scope: AuthorizationScope[]
    created_at: number
}
