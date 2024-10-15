// Copied from https://github.com/unsplash/unsplash-js/blob/master/src/methods/topics/types.ts
import type { NonEmptyArray, Nullable } from '@/helpers/typescript.ts'
import type { PaginationParams } from '@/types/request.ts'
import type { Entity } from './entities.ts'

import type * as Photo from './photos.ts'
import type * as User from './users.ts'

export type TopicOrderBy = 'latest' | 'oldest' | 'position' | 'featured'

export type IdOrSlugParam = {
  id_or_slug: string
}

export type IdsParam = {
  ids?: string[]
}

export type ListParams =
  & IdsParam
  & Omit<PaginationParams, 'order_by'>
  & {
    order_by?: TopicOrderBy
  }

export interface VeryBasic extends Entity {
  slug: string
  title: string
  visibility: 'hidden' | 'public'
}

export interface Basic extends VeryBasic {
  cover_photo: Photo.Basic | null
  current_user_contributions: Photo.VeryBasic[]
  description: string | null
  ends_at: string | null
  featured: boolean
  links: {
    self: string
    html: string
    photos: string
  }
  owners: NonEmptyArray<User.Basic>
  preview_photos: Photo.VeryBasic[] | null
  published_at: string
  starts_at: string
  status: 'open' | 'closed'
  total_photos: number
  updated_at: string
}

export interface Full extends Basic {
  top_contributors: User.Basic[]
}

export interface Submission {
  [n: string]: {
    status: 'open' | 'approved' | 'rejected'
    approved_on: Nullable<string>
  }
}

export interface Photos extends Photo.Basic {}
