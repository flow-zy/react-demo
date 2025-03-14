export enum BasicStatus {
  DISABLE = 0,
  ENABLE = 1,
}

export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
}

export enum StorageEnum {
  UserInfo = 'userInfo',
  UserToken = 'userToken',
  Settings = 'settings',
  I18N = 'i18nextLng',
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export enum ThemeLayout {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Mini = 'mini',
}

export enum ThemeColorPresets {
  Default = 'default',
  Cyan = 'cyan',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}

export enum LocalEnum {
  en_US = 'en_US',
  zh_CN = 'zh_CN',
}

export enum MultiTabOperation {
  FULLSCREEN = 'fullscreen',
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSEOTHERS = 'closeOthers',
  CLOSEALL = 'closeAll',
  CLOSELEFT = 'closeLeft',
  CLOSERIGHT = 'closeRight',
}

export enum PermissionType {
  CATALOGUE = 0,
  MENU = 1,
  BUTTON = 2,
}
export const SIDE_BAR_MINI_WIDTH = 48
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80

export enum ContentEnum {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed',
}

// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  // 角色权限
  ROLE = 'ROLE',
  // back
  // 后端
  BACK = 'BACK',
  // route mapping
  // 路由映射
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

// Route switching animation
// 路由切换动画
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}
export enum TabTheme {
  Google = 'google', // Google
  Card = 'card', // 卡片
  Plain = 'plain', // 纯色
}

// 类名映射规则（基于 animate.css 的动画名称）：
export const TRANSITION_CLASSES = {
  [RouterTransitionEnum.ZOOM_FADE]: {
    enter: 'animate__animated animate__zoomIn animate__fadeIn',
    exit: 'animate__animated animate__zoomOut animate__fadeOut',
  },
  [RouterTransitionEnum.ZOOM_OUT]: {
    enter: 'animate__animated animate__zoomIn',
    exit: 'animate__animated animate__zoomOut',
  },
  [RouterTransitionEnum.FADE_SIDE]: {
    enter: 'animate__animated animate__fadeInLeft',
    exit: 'animate__animated animate__fadeOutRight',
  },
  [RouterTransitionEnum.FADE]: {
    enter: 'animate__animated animate__fadeIn',
    exit: 'animate__animated animate__fadeOut',
  },
  [RouterTransitionEnum.FADE_BOTTOM]: {
    enter: 'animate__animated animate__fadeInUp',
    exit: 'animate__animated animate__fadeOutDown',
  },
  [RouterTransitionEnum.FADE_SCALE]: {
    enter: 'animate__animated animate__fadeIn animate__scaleUp',
    exit: 'animate__animated animate__fadeOut animate__scaleDown',
  },
} as const
