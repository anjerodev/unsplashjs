// Copied from https://github.com/unsplash/unsplash-js/blob/master/src/methods/collections/types.ts
import type { Nullable } from '@/helpers/typescript.ts'
import type { OrientationParam, PaginationParams } from '@/types/request.ts'
import type { Entity } from './entities.ts'
import type * as Photo from './photos.ts'
import type * as User from './users.ts'

export type CollectionId = {
  collection_id: string
}

export type PhotosParams =
  & Omit<PaginationParams, 'order_by'>
  & OrientationParam

type Tag = {
  type: 'search'
  title: string
}

export interface VeryBasic extends Entity {
  title: string
  published_at: string
  /**
   * This is different from `updated_at` because that may
   * also change when a photo inside changes or is deleted.
   */
  last_collected_at: string
  updated_at: string
  user: Nullable<User.Basic>
  cover_photo: Nullable<Photo.Basic>
  share_key: Nullable<string>
}

export interface Basic extends VeryBasic {
  description: Nullable<string>
  featured: boolean
  links: {
    self: string
    html: string
    photos: string
    download?: string
    related?: string
  }
  preview_photos: Nullable<Photo.VeryBasic[]>
  total_photos: number
  tags: Nullable<Array<Tag>>
}

export interface Photos extends Array<Photo.Full> {}

export interface CreateCollection {
  title: string
  description?: string
  private?: boolean
}
