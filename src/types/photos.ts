// Copied from https://github.com/unsplash/unsplash-js/blob/master/src/methods/photos/types.ts
import type { Nullable, Range } from '@/helpers/typescript.ts'
import type { Entity } from './entities.ts'
import type * as Collection from './collections.ts'
import type * as User from './users.ts'
import type * as Topic from './topics.ts'
import type { Language } from './search.ts'
import type { OrientationParam, StatsParams } from './request.ts'

export type PhotoId = {
  photo_id: string
}

export type RandomParams = {
  /**
   * Public collection ID(‘s) to filter selection. If multiple, comma-separated
   */
  collections?: string[]
  /**
   * Public topic ID(‘s) to filter selection. If multiple, comma-separated
   */
  topics?: string[]
  /**
   * Limit selection to a single user.
   */
  username?: string
  /**
   * Limit selection to photos matching a search term.
   */
  query?: string
  /**
   * Limit results by content safety
   */
  content_filter?: 'low' | 'high'
  /**
   * The number of photos to return. (Default: 1; max: 30)
   */
  count?: Range<1, 30>
  /**
   * Limit selection to featured photos. No info in API docs.
   */
  featured?: boolean
} & OrientationParam

interface StatValue {
  date: string
  value: number
}

interface Stat {
  total: number
  historical: {
    change: number
    quantity: StatsParams['quantity']
    resolution: StatsParams['resolution']
    values: StatValue[]
  }
}

type Links = {
  self: string
  html: string
  download: string
  download_location: string
}

type Exif = {
  make: Nullable<string>
  model: Nullable<string>
  name: Nullable<string>
  exposure_time: Nullable<string>
  aperture: Nullable<string>
  focal_length: Nullable<string>
  iso: Nullable<number>
}

type Location = {
  city: Nullable<string>
  country: Nullable<string>

  /** full string representation of the location, including `city` and `country` if they exist. */
  name: Nullable<string>

  position: {
    latitude: Nullable<number>
    longitude: Nullable<number>
  }
}

export interface Stats extends Entity {
  views: Stat
  downloads: Stat
}

export interface VeryBasic extends Entity {
  slug: string
  created_at: string
  updated_at: string
  urls: {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
    small_s3: string
  }
}

export interface CurrentUserBased {
  liked_by_user: boolean
  /**
   * The *current user's* collections that this photo belongs to.
   */
  current_user_collections: Collection.VeryBasic[]
}

// Not defined in Documentation but returned by API
export interface Sponsorship {
  impression_urls: string[]
  tagline: string
  tagline_url: string
  sponsor: User.Basic
}

export interface Basic extends VeryBasic, CurrentUserBased {
  alternative_slugs: Nullable<Record<Language, string>>
  alt_description: Nullable<string>
  blur_hash: Nullable<string>
  breadcrumbs: Array<Breadcrumb>
  color: Nullable<string>
  description: Nullable<string>
  height: number
  likes: number
  links: Links
  promoted_at: Nullable<string>
  width: number
  user: User.Basic
  sponsorship: Nullable<Sponsorship>
  topic_submissions: Nullable<Topic.Submission>
  asset_type: 'photo'
  views: number
  downloads: number
}

interface ExifAndLocation {
  exif: Exif
  location: Location
}

interface Meta {
  meta: {
    index: boolean
  }
}

export interface Random extends Basic, ExifAndLocation {}

type RelatedCollectionsType =
  // Ambiguously related collections
  | 'related'
  // Collections the photo belongs to
  | 'collected'

type Breadcrumb = {
  slug: string
  title: string
  index: number
  type: 'landing_page' | 'search'
}

type Tag = {
  type: 'search' | 'landing_page'
  title: string
}

interface LandingPageTag extends Tag {
  ancestry: {
    type: {
      slug: string
      pretty_slug: string
    }
    category: {
      slug: string
      pretty_slug: string
    }
    subcategory: {
      slug: string
      pretty_slug: string
    }
  }
  source: Collection.Basic[]
}

export interface Full extends Basic, ExifAndLocation, Meta {
  public_domain: boolean
  tags: Array<Tag | LandingPageTag>
  topics: Array<Topic.VeryBasic>
  related_collections: {
    total: number
    type: RelatedCollectionsType
    results: Collection.Basic[]
  }
}

export interface UpdatePhoto extends Entity {
  description?: string
  /**
   * The photo’s visibility
   */
  show_on_profile?: boolean
  tags?: Array<{ title: string }>
  location?: {
    /**
     * The photo location’s latitude rounded to 6 decimals.
     */
    latitude?: string
    /**
     * The photo location’s longitude rounded to 6 decimals.
     */
    longitude?: string
    /**
     * The photo’s full location string (including city and country)
     */
    name?: string
    city?: string
    country?: string
  }
  exif?: {
    /**
     * The photo’s make (e.g. “Canon”)
     */
    make?: string
    /**
     * The photo’s model (e.g. “Canon EOS 5D Mark II”)
     */
    model?: string
    /**
     * The photo’s exposure time (e.g. “1/50”)
     */
    exposure_time?: string
    /**
     * The photo’s aperture value (e.g. “f/2.8”)
     */
    aperture_value?: string
    /**
     * The photo’s focal length (e.g. “100mm”)
     */
    focal_length?: string
    /**
     * The photo’s iso (e.g. “800”)
     */
    iso_speed_ratings?: string
  }
}
