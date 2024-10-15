import { mockGlobalFetch, resetGlobalFetch } from '@c4spar/mock-fetch'

import { clientConfig } from '@/main.test.ts'
import { mockAndAssert } from '@/helpers/utils.ts'
import Search from '@/methods/search.ts'

Deno.test('should successfully build search request arguments', async (ctx) => {
    mockGlobalFetch()
    const S = new Search(clientConfig)

    await ctx.step('search.photos', async () => {
        await mockAndAssert({
            endPoint: '/search/photos',
            searchParams: { query: 'foo', page: '1', per_page: '2' },
            requestFn: () =>
                S.photos({
                    query: 'foo',
                    page: 1,
                    per_page: 2,
                }),
        })
    })

    await ctx.step('search.collections', async () => {
        await mockAndAssert({
            endPoint: '/search/collections',
            searchParams: { query: 'foo', page: '1', per_page: '2' },
            requestFn: () =>
                S.collections({
                    query: 'foo',
                    page: 1,
                    per_page: 2,
                }),
        })
    })

    await ctx.step('search.users', async () => {
        await mockAndAssert({
            endPoint: '/search/users',
            searchParams: { query: 'foo', page: '1', per_page: '2' },
            requestFn: () =>
                S.users({
                    query: 'foo',
                    page: 1,
                    per_page: 2,
                }),
        })
    })

    resetGlobalFetch()
})
