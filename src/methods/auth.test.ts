import { mockGlobalFetch, resetGlobalFetch } from '@c4spar/mock-fetch'
import { assertEquals } from '@std/assert'

import { clientConfig } from '@/main.test.ts'
import { mockAndAssert } from '@/helpers/utils.ts'

import Auth, { OAUTH_AUTHORIZE_URL } from '@/methods/auth.ts'

Deno.test('should successfully build auth request arguments', async (ctx) => {
    mockGlobalFetch()
    const AuthClient = new Auth(clientConfig)

    await ctx.step('auth.getAuthenticationUrl', () => {
        const url = AuthClient.getAuthenticationUrl({
            redirect_uri: 'bar',
            response_type: 'code',
            scope: ['public'],
        })

        assertEquals(
            url,
            `${OAUTH_AUTHORIZE_URL}?client_id=${clientConfig.accessKey}&redirect_uri=bar&response_type=code&scope=public`,
        )
    })

    await ctx.step('auth.userAuthentication', async () => {
        const body = {
            client_secret: 'secret',
            redirect_uri: 'bar',
            code: 'baz',
        }
        await mockAndAssert({
            endPoint: '/oauth/token',
            method: 'post',
            body: {
                client_id: clientConfig.accessKey,
                grant_type: 'authorization_code',
                ...body,
            },
            requestFn: () => AuthClient.userAuthentication(body),
        })
    })

    resetGlobalFetch()
})
