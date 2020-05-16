declare module 'vue-picture-element'

declare interface MediaQuery {
  [key: string]: [string]
}

declare type SizeType = [[MediaQuery?, string?]]

declare interface SettingItem {
  media?: MediaQuery[]
  delimetrs?: string[]
  size?: SizeType
  test?: RegExp
}

declare interface Settings {
  [key: string]: SettingItem
}

declare type DelimeterType = 'x' | 'w' | undefined
