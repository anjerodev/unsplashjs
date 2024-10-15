import { mockGlobalFetch, resetGlobalFetch } from '@c4spar/mock-fetch'

import { clientConfig } from '@/main.test.ts'
import { mockAndAssert } from '@/helpers/utils.ts'
import Topics from '@/methods/topics.ts'

Deno.test('should successfully build collections request arguments', async (ctx) => {
    mockGlobalFetch()
    const Topic = new Topics(clientConfig)

    await ctx.step('topics.list', async () => {
        await mockAndAssert({
            endPoint: '/topics',
            searchParams: { page: '1', per_page: '2', ids: 'foo,bar' },
            requestFn: () =>
                Topic.list({ page: 1, per_page: 2, ids: ['foo', 'bar'] }),
        })
    })

    await ctx.step('topics.get', async () => {
        await mockAndAssert({
            endPoint: `/topics/:id_or_slug`,
            requestFn: () => Topic.get({ id_or_slug: 'foo' }),
        })
    })

    await ctx.step('topics.photos', async () => {
        await mockAndAssert({
            endPoint: `/topics/:id_or_slug/photos`,
            searchParams: { page: '1', per_page: '2' },
            requestFn: () =>
                Topic.photos({
                    id_or_slug: 'foo',
                    page: 1,
                    per_page: 2,
                }),
        })
    })

    resetGlobalFetch()
})
