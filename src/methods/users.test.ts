import { mockGlobalFetch, resetGlobalFetch } from '@c4spar/mock-fetch'

import { clientConfig } from '@/main.test.ts'
import Users from '@/methods/users.ts'
import { mockAndAssert } from '@/helpers/utils.ts'

Deno.test('should successfully build users request arguments', async (ctx) => {
    mockGlobalFetch()
    const User = new Users(clientConfig)

    await ctx.step('users.getCurrent', async () => {
        await mockAndAssert({
            endPoint: '/me',
            requestFn: () => User.getCurrent(),
        })
    })

    await ctx.step('users.updateCurrent', async () => {
        const params = {
            username: 'foo',
        }

        await mockAndAssert({
            endPoint: `/me`,
            method: 'put',
            body: params,
            requestFn: () => User.updateCurrent(params),
        })
    })

    await ctx.step('users.get', async () => {
        await mockAndAssert({
            endPoint: `/users/:username`,
            requestFn: () => User.get({ username: 'foo' }),
        })
    })

    await ctx.step('users.portfolio', async () => {
        await mockAndAssert({
            endPoint: `/users/:username/portfolio`,
            requestFn: () => User.portfolio({ username: 'foo' }),
        })
    })

    await ctx.step('users.photos', async () => {
        await mockAndAssert({
            endPoint: `/users/:username/photos`,
            searchParams: { page: '1', per_page: '2', stats: 'true' },
            requestFn: () =>
                User.photos({
                    username: 'foo',
                    page: 1,
                    per_page: 2,
                    stats: true,
                }),
        })
    })

    await ctx.step('users.likedPhotos', async () => {
        await mockAndAssert({
            endPoint: `/users/:username/likes`,
            searchParams: { page: '1', per_page: '2' },
            requestFn: () =>
                User.likedPhotos({
                    username: 'foo',
                    page: 1,
                    per_page: 2,
                }),
        })
    })

    await ctx.step('users.collections', async () => {
        await mockAndAssert({
            endPoint: `/users/:username/collections`,
            searchParams: { page: '1', per_page: '2' },
            requestFn: () =>
                User.collections({
                    username: 'foo',
                    page: 1,
                    per_page: 2,
                }),
        })
    })

    await ctx.step('users.stats', async () => {
        await mockAndAssert({
            endPoint: `/users/:username/statistics`,
            requestFn: () => User.stats({ username: 'foo' }),
        })
    })

    resetGlobalFetch()
})
