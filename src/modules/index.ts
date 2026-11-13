import type { AnimationModule } from '@/types/animation'
import { httpsHandshakeModule } from './https-handshake'
import { md5AlgorithmModule } from './md5-algorithm'

/**
 * 全局已注册的动画模块清单
 */
export const animationModules: AnimationModule[] = [
  httpsHandshakeModule,
  md5AlgorithmModule,
]

/**
 * 默认启用的动画模块 ID
 */
export const DEFAULT_MODULE_ID = 'https-handshake'

/**
 * 根据 ID 检索动画模块
 * @param id 模块唯一标识符
 */
export function getModuleById(id: string): AnimationModule | undefined {
  return animationModules.find((m) => m.id === id)
}

/**
 * 动态注册新动画模块（支持后续扩展插拔）
 * @param mod 符合 AnimationModule 规范的新模块
 */
export function registerModule(mod: AnimationModule): void {
  const exists = animationModules.some((m) => m.id === mod.id)
  if (!exists) {
    animationModules.push(mod)
  }
}
