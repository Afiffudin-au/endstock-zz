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
  keywords :any
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
