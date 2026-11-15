import type { AnimationModule, AnimationCategory } from '@/types/animation'
import { httpsHandshakeModule } from './https-handshake'
import { md5AlgorithmModule } from './md5-algorithm'
import { websocketProtocolModule } from './websocket-protocol'
import { tcpIpProtocolModule } from './tcp-ip-protocol'
import { sha256AlgorithmModule } from './sha256-algorithm'
import { tcpHandshakeWaveModule } from './tcp-handshake-wave'

/**
 * 全局已注册的动画模块清单
 */
export const animationModules: AnimationModule[] = [
  httpsHandshakeModule,
  md5AlgorithmModule,
  websocketProtocolModule,
  tcpIpProtocolModule,
  sha256AlgorithmModule,
  tcpHandshakeWaveModule,
]

/**
 * 动画分类定义清单
 */
export const animationCategories: AnimationCategory[] = [
  {
    id: 'network',
    titleKey: 'categories.network.title',
    descriptionKey: 'categories.network.description',
    icon: '🌐',
    color: '#3b82f6',
    moduleIds: [
      'tcp-handshake-wave',
      'tcp-ip-protocol',
      'websocket-protocol',
      'https-handshake',
    ],
  },
  {
    id: 'crypto',
    titleKey: 'categories.crypto.title',
    descriptionKey: 'categories.crypto.description',
    icon: '🔐',
    color: '#f59e0b',
    moduleIds: [
      'sha256-algorithm',
      'md5-algorithm',
    ],
  },
]

/**
 * 获取按分类聚合后的模块数据
 */
export function getCategorizedModules(): Array<AnimationCategory & { modules: AnimationModule[] }> {
  return animationCategories.map((cat) => {
    const modules = cat.moduleIds
      .map((id) => getModuleById(id))
      .filter((m): m is AnimationModule => Boolean(m))
    return {
      ...cat,
      modules,
    }
  })
}

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
 * 根据 ID 检索动画分类
 * @param id 分类唯一标识符
 */
export function getCategoryById(id: string): AnimationCategory | undefined {
  return animationCategories.find((c) => c.id === id)
}

/**
 * 根据分类 ID 获取包含完整模块列表的分类详情
 * @param id 分类唯一标识符
 */
export function getCategoryWithModules(id: string): (AnimationCategory & { modules: AnimationModule[] }) | undefined {
  const cat = getCategoryById(id)
  if (!cat) return undefined
  const modules = cat.moduleIds
    .map((modId) => getModuleById(modId))
    .filter((m): m is AnimationModule => Boolean(m))
  return {
    ...cat,
    modules,
  }
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
