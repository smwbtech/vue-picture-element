declare interface MediaQuery {
  [key: string]: [string]
}

declare interface SettingItem {
  media?: MediaQuery[]
  delimetrs?: string[]
  test?: RegExp
}

declare interface Settings {
  [key: string]: SettingItem
}

declare type DelimeterType = 'x' | 'w' | undefined
