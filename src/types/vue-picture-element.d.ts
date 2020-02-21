declare module 'vue-picture-element' {
  export interface MediaQuery {
    [key: string]: [string]
  }

  export interface SettingItem {
    media?: MediaQuery[]
    xDelimetr?: string[]
    test?: RegExp
  }

  export interface Settings {
    [key: string]: SettingItem
  }
}
