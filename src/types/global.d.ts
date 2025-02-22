declare const __APP_INFO__: {
  pkg: {
    name: string
    version: string
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}
// fix FullScreen type error
interface Document {
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
}

export type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

declare type Nullable<T> = T | null
declare type NonNullable<T> = T extends null | undefined ? never : T
declare type Recordable<T = any> = Record<string, T>
declare interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T
}
declare interface Indexable<T = any> {
  [key: string]: T
}
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>

declare interface ChangeEvent extends Event {
  target: HTMLInputElement
}

declare interface WheelEvent {
  path?: EventTarget[]
}
interface ImportMetaEnv extends ViteEnv {
  __: unknown
}
declare interface ViteEnv {
  readonly VITE_USE_MOCK: boolean
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_GLOB_APP_TITLE: string
  readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  readonly VITE_APP_ROUTER_MODE: 'permission' | 'module'
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_HOMEPAGE: string
  readonly VITE_APP_BASE_PATH: string
  readonly VITE_APP_ENV: 'development' | 'production'
}

declare function parseInt(s: string | number, radix?: number): number

declare function parseFloat(string: string | number): number

declare namespace JSX {
  interface ElementAttributesProperty {
    $props: any
  }
  interface IntrinsicElements {
    [elem: string]: any
  }
  interface IntrinsicAttributes {
    [elem: string]: any
  }
}
