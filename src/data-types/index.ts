export interface SearchVideoConfig {
  query: string
  page: number
  per_page: number
  sort: string
  keyword_safe_search: boolean
  added_date: string
}
export interface SearchImageConfig {
  query: string
  page: number
  sort: string
  safe: boolean
  per_page: number
  image_type: string
  people_age: string
}
export interface SearchMusicConfig {
  query: string
  page: number
  per_page: number
  sort: string
  sort_order: string
}
interface JpgItems {
  display_name: string
  dpi: number
  file_size: number
  format: string
  height: number
  is_licensable: boolean
  width: number
}
interface ThumbItems {
  height: number
  url: string
  width: number
}
export interface ImageDetailItems {
  id: string | number
  description: string
  keywords: any
  assets: {
    huge_jpg: JpgItems
    huge_thumb: ThumbItems
    large_thumb: ThumbItems
    medium_jpg: JpgItems
    preview: ThumbItems
    preview_1000: ThumbItems
    preview_1500: ThumbItems
    small_jpg: JpgItems
    small_thumb: ThumbItems
  }
}
