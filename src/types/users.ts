// Copied from https://github.com/unsplash/unsplash-js/blob/master/src/methods/users/types.ts
import type { Nullable } from '@/helpers/typescript.ts'
import type { Entity } from './entities.ts'
import type * as Photo from './photos.ts'
import type * as Collection from './collections.ts'
import type {
  OrientationParam,
  PaginationParams,
  StatsParams,
} from './request.ts'

export type Username = {
  username: string
}

export interface PhotosParams extends PaginationParams, OrientationParam {
  username: string
}

export interface PhotosWithStatsParams extends PhotosParams, StatsParams {
  stats?: boolean
}

export interface UserPhotos extends Array<Photo.Full> {}
export interface UserCollections extends Array<Collection.Basic> {}

interface StatValue {
  date: string
  value: number
}

interface Stat {
  total: number
  historical: {
    change: number
    average: number
    resolution: StatsParams['resolution']
    quantity: StatsParams['quantity']
    values: StatValue[]
  }
}

export interface Stats extends Entity {
  username: string
  downloads: Stat
  views: Stat
}

export interface Links {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
  followers: string
  following: string
}

export interface Basic extends Entity {
  accepted_tos: boolean
  for_hire: boolean
  username: string
  name: string
  bio: Nullable<string>
  downloads: number
  first_name: string
  followed_by_user: boolean
  instagram_username: Nullable<string>
  last_name: Nullable<string>
  links: Links
  location: Nullable<string>
  portfolio_url: Nullable<string>
  total_collections: number
  total_likes: number
  total_photos: number
  total_promoted_photos: number
  total_illustrations: number
  total_promoted_illustrations: number
  twitter_username: Nullable<string>
  updated_at: string
  social: {
    instagram_username: Nullable<string>
    twitter_username: Nullable<string>
    portfolio_url: Nullable<string>
    paypal_email: Nullable<string>
  }
  profile_image: {
    small: string
    medium: string
    large: string
  }
}

export interface Current extends Basic {
  email: string
  uploads_remaining: number
}

export interface Medium extends Basic {
  photos: Photo.VeryBasic[]
}

export interface Full extends Medium {
  followers_count: number
  following_count: number
  badge: Nullable<{
    title: string
    primary: boolean
    slug: string
    link: string
  }>
  allow_messages: boolean
  numeric_id: string
}

export interface UpdateCurrent {
  username?: string
  first_name?: string
  last_name?: string
  email?: string
  url?: string
  location?: string
  bio?: string
  instagram_username?: string
}
