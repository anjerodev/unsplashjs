import { assertEquals, assertInstanceOf } from '@std/assert'
import UnsplashClient from '@/main.ts'
import { fetchOptionsConstructor } from '@/helpers/utils.ts'
import { API_URL } from '@/helpers/constants.ts'

const accessKey = 'My-Access-Key'
const headers = { 'X-Custom-Header': 'foo' }

export const clientConfig = {
    accessKey,
    requestOptions: {
        headers,
    },
}

Deno.test('should successfully construct an Unsplash instance', () => {
    const unsplash = new UnsplashClient(clientConfig)
    assertInstanceOf(unsplash, UnsplashClient)
})

Deno.test('should successfully construct fetch options', () => {
    const { url, options } = fetchOptionsConstructor({
        accessKey,
        endpoint: '/photos',
        query: { page: 1, per_page: 5 },
        initRequestOptions: {
            headers,
        },
        requestOptions: {
            headers: {
                'cache-control': 'no-cache',
            },
        },
    })

    assertEquals(
        url.toString(),
        `${API_URL}/photos?page=1&per_page=5`,
    )
    assertEquals(options.method, 'GET')
    assertEquals(options.headers.get('Accept-Version'), 'v1')
    assertEquals(options.headers.get('Authorization'), `Client-ID ${accessKey}`)
    assertEquals(options.headers.get('X-Custom-Header'), 'foo')
    assertEquals(options.headers.get('cache-control'), 'no-cache')
})
