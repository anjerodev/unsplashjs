import type { InitParams } from '@/types/request.ts'
import Photos from '@/methods/photos.ts'
import Users from '@/methods/users.ts'
import Search from '@/methods/search.ts'
import Collections from '@/methods/collections.ts'
import Topics from '@/methods/topics.ts'
import Stats from '@/methods/stats.ts'
import Auth from '@/methods/auth.ts'

export default class UnsplashClient {
  public users: Users
  public photos: Photos
  public search: Search
  public collections: Collections
  public topics: Topics
  public stats: Stats
  public auth: Auth

  constructor(config: InitParams) {
    this.users = new Users(config)
    this.photos = new Photos(config)
    this.search = new Search(config)
    this.collections = new Collections(config)
    this.topics = new Topics(config)
    this.stats = new Stats(config)
    this.auth = new Auth(config)
  }
}
