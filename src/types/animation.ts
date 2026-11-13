/**
 * 主题模式类型
 * - 'light': 浅色模式
 * - 'dark': 深色模式
 * - 'system': 跟随操作系统偏好
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * 镜头姿态定义
 */
export interface CameraPose {
  /** 镜头 X 轴偏移 (px) */
  x: number
  /** 镜头 Y 轴偏移 (px) */
  y: number
  /** 镜头缩放比 (1 为原始尺寸) */
  scale: number
  /** 镜头旋转角度 (deg)，默认 0 */
  rotation?: number
}

/**
 * 动画章节 / 步骤元数据
 */
export interface AnimationStep {
  /** 步骤唯一标识符 */
  id: string
  /** 步骤序号 (从 1 开始) */
  stepNumber: number
  /** 国际化标题对应的 key */
  titleKey: string
  /** 国际化解说词对应的 key (支持富文本/公式) */
  descriptionKey: string
  /** 当前步骤在时间轴上的持续时间 (秒) */
  duration: number
  /** 推荐的镜头姿态 */
  camera: CameraPose
  /** 步骤标签 (如 "TCP", "TLS 1.3", "Padding" 等) */
  badgeKey?: string
}

/**
 * 动画模块定义规范
 */
export interface AnimationModule {
  /** 模块唯一 ID */
  id: string
  /** 国际化名称 key */
  titleKey: string
  /** 国际化简要描述 key */
  summaryKey: string
  /** 分类标签 key */
  categoryKey: string
  /** 标签颜色 */
  categoryColor: string
  /** 动画包含的所有步骤 */
  steps: AnimationStep[]
  /** 预估全流程动画时长 (秒) */
  totalDuration: number
}

/**
 * 播放状态
 */
export type PlaybackState = 'idle' | 'playing' | 'paused' | 'completed'

/**
 * 播放速率枚举
 */
export type PlaybackSpeed = 0.5 | 1 | 1.5 | 2
