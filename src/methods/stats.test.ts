import { mockGlobalFetch, resetGlobalFetch } from '@c4spar/mock-fetch'

import { clientConfig } from '@/main.test.ts'
import { mockAndAssert } from '@/helpers/utils.ts'
import Stats from '@/methods/stats.ts'

Deno.test('should successfully build stats request arguments', async (ctx) => {
    mockGlobalFetch()
    const Stat = new Stats(clientConfig)

    await ctx.step('stats.total', async () => {
        await mockAndAssert({
            endPoint: '/stats/total',
            requestFn: () => Stat.total(),
        })
    })

    await ctx.step('stats.month', async () => {
        await mockAndAssert({
            endPoint: '/stats/month',
            requestFn: () => Stat.month(),
        })
    })

    resetGlobalFetch()
})
