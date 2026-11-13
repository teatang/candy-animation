import type { AnimationModule } from '@/types/animation'

/**
 * MD5 摘要算法底层运算全流程模块配置
 */
export const md5AlgorithmModule: AnimationModule = {
  id: 'md5-algorithm',
  categoryId: 'crypto',
  titleKey: 'modules.md5.title',
  summaryKey: 'modules.md5.summary',
  categoryKey: 'modules.md5.category',
  categoryColor: '#8b5cf6',
  totalDuration: 23,
  steps: [
    {
      id: 'md5-padding',
      stepNumber: 1,
      titleKey: 'modules.md5.steps.step1.title',
      badgeKey: 'modules.md5.steps.step1.badge',
      descriptionKey: 'modules.md5.steps.step1.description',
      duration: 5.5,
      camera: {
        x: 0,
        y: -30,
        scale: 1.15,
        rotation: 0,
      },
    },
    {
      id: 'md5-buffer-init',
      stepNumber: 2,
      titleKey: 'modules.md5.steps.step2.title',
      badgeKey: 'modules.md5.steps.step2.badge',
      descriptionKey: 'modules.md5.steps.step2.description',
      duration: 5,
      camera: {
        x: 0,
        y: 10,
        scale: 1.3,
        rotation: 0,
      },
    },
    {
      id: 'md5-main-loop',
      stepNumber: 3,
      titleKey: 'modules.md5.steps.step3.title',
      badgeKey: 'modules.md5.steps.step3.badge',
      descriptionKey: 'modules.md5.steps.step3.description',
      duration: 7,
      camera: {
        x: 0,
        y: 20,
        scale: 1.25,
        rotation: 0,
      },
    },
    {
      id: 'md5-cascade-output',
      stepNumber: 4,
      titleKey: 'modules.md5.steps.step4.title',
      badgeKey: 'modules.md5.steps.step4.badge',
      descriptionKey: 'modules.md5.steps.step4.description',
      duration: 5.5,
      camera: {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
      },
    },
  ],
}
