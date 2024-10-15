import { mockGlobalFetch, resetGlobalFetch } from '@c4spar/mock-fetch'

import { clientConfig } from '@/main.test.ts'
import Photos from '@/methods/photos.ts'
import { mockAndAssert } from '@/helpers/utils.ts'

const PHOTOS_IDS = ['abc123', 'def456']
const COLLECTIONS_IDS = ['ghi789', 'jkl012']

Deno.test('should successfully build photos request arguments', async (ctx) => {
    mockGlobalFetch()
    const Photo = new Photos(clientConfig)

    await ctx.step('photos.list', async () => {
        await mockAndAssert({
            endPoint: '/photos',
            searchParams: { page: '1', per_page: '2' },
            requestFn: () => Photo.list({ page: 1, per_page: 2 }),
        })
    })

    await ctx.step('photos.get', async () => {
        await mockAndAssert({
            endPoint: `/photos/:id`,
            requestFn: () => Photo.get({ photo_id: PHOTOS_IDS[0] }),
        })
    })

    await ctx.step('photos.getRandom', async () => {
        await mockAndAssert({
            endPoint: `/photos/random`,
            searchParams: {
                query: 'cat',
                count: '3',
                collections: COLLECTIONS_IDS.join(','),
            },
            requestFn: () =>
                Photo.getRandom({
                    query: 'cat',
                    count: 3,
                    collections: [COLLECTIONS_IDS[0], COLLECTIONS_IDS[1]],
                }),
        })
    })

    await ctx.step('photos.stats', async () => {
        await mockAndAssert({
            endPoint: `/photos/:id/statistics`,
            requestFn: () => Photo.stats({ photo_id: PHOTOS_IDS[0] }),
        })
    })

    await ctx.step('photos.trackDownload', async () => {
        await mockAndAssert({
            endPoint: `/photos/:id/download`,
            requestFn: () => Photo.trackDownload({ photo_id: PHOTOS_IDS[0] }),
        })
    })

    await ctx.step('photos.update', async () => {
        const params = {
            description: 'foo',
            location: {
                latitude: '1.23',
            },
        }

        await mockAndAssert({
            endPoint: `/photos/:id`,
            method: 'put',
            body: params,
            requestFn: () => Photo.update({ id: PHOTOS_IDS[0], ...params }),
        })
    })

    await ctx.step('photos.like', async () => {
        await mockAndAssert({
            endPoint: `/photos/:id/like`,
            method: 'post',
            requestFn: () => Photo.like({ photo_id: PHOTOS_IDS[0] }),
        })
    })

    await ctx.step('photos.unlike', async () => {
        await mockAndAssert({
            endPoint: `/photos/:id/like`,
            method: 'delete',
            requestFn: () => Photo.unlike({ photo_id: PHOTOS_IDS[0] }),
        })
    })

    resetGlobalFetch()
})
