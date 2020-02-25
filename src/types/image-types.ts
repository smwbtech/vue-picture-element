export enum Extansions {
  apng = 'image/apng',
  bmp = 'image/bmp',
  gif = 'image/gif',
  cur = 'image/x-icon',
  ico = 'image/x-icon',
  jpg = 'image/jpeg',
  jpeg = 'image/jpeg',
  jfif = 'image/jpeg',
  pjpeg = 'image/jpeg',
  pjp = 'image/jpeg',
  png = 'image/png',
  svg = 'image/svg+xml',
  tif = 'image/tiff',
  tiff = 'image/tiff',
  webp = 'image/webp'
}

export type AvailableTypes = keyof typeof Extansions
