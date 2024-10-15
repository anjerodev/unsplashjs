import { mockGlobalFetch, resetGlobalFetch } from '@c4spar/mock-fetch'

import { clientConfig } from '@/main.test.ts'
import { mockAndAssert } from '@/helpers/utils.ts'
import Collections from '@/methods/collections.ts'

const COLLECTIONS_IDS = ['ghi789', 'jkl012']

Deno.test('should successfully build collections request arguments', async (ctx) => {
    mockGlobalFetch()
    const Collection = new Collections(clientConfig)

    await ctx.step('collections.list', async () => {
        await mockAndAssert({
            endPoint: '/collections',
            searchParams: { page: '1', per_page: '2' },
            requestFn: () => Collection.list({ page: 1, per_page: 2 }),
        })
    })

    await ctx.step('collections.get', async () => {
        await mockAndAssert({
            endPoint: `/collections/:collection_id`,
            requestFn: () =>
                Collection.get({ collection_id: COLLECTIONS_IDS[0] }),
        })
    })

    await ctx.step('collections.photos', async () => {
        await mockAndAssert({
            endPoint: `/collections/:collection_id/photos`,
            searchParams: { page: '1', per_page: '2' },
            requestFn: () =>
                Collection.photos({
                    collection_id: COLLECTIONS_IDS[0],
                    page: 1,
                    per_page: 2,
                }),
        })
    })

    await ctx.step('collections.related', async () => {
        await mockAndAssert({
            endPoint: `/collections/:collection_id/related`,
            requestFn: () =>
                Collection.related({ collection_id: COLLECTIONS_IDS[0] }),
        })
    })

    await ctx.step('collections.create', async () => {
        const params = {
            title: 'foo',
            description: 'bar',
        }

        await mockAndAssert({
            endPoint: '/collections',
            method: 'post',
            body: params,
            requestFn: () => Collection.create(params),
        })
    })

    await ctx.step('collections.update', async () => {
        const params = {
            title: 'foo',
            description: 'bar',
        }

        await mockAndAssert({
            endPoint: `/collections/:collection_id`,
            method: 'put',
            body: params,
            requestFn: () =>
                Collection.update({
                    collection_id: COLLECTIONS_IDS[0],
                    ...params,
                }),
        })
    })

    await ctx.step('collections.delete', async () => {
        await mockAndAssert({
            endPoint: `/collections/:collection_id`,
            method: 'delete',
            requestFn: () =>
                Collection.delete({ collection_id: COLLECTIONS_IDS[0] }),
        })
    })

    resetGlobalFetch()
})
