import type { AnimationModule } from '@/types/animation'

/**
 * SHA-256 安全散列算法底层原理模块配置
 */
export const sha256AlgorithmModule: AnimationModule = {
  id: 'sha256-algorithm',
  categoryId: 'crypto',
  titleKey: 'modules.sha256.title',
  summaryKey: 'modules.sha256.summary',
  categoryKey: 'modules.sha256.category',
  categoryColor: '#f59e0b',
  totalDuration: 23,
  steps: [
    {
      id: 'sha256-padding',
      stepNumber: 1,
      titleKey: 'modules.sha256.steps.step1.title',
      badgeKey: 'modules.sha256.steps.step1.badge',
      descriptionKey: 'modules.sha256.steps.step1.description',
      duration: 5.5,
      camera: {
        x: 0,
        y: -30,
        scale: 1.15,
        rotation: 0,
      },
    },
    {
      id: 'sha256-init-registers',
      stepNumber: 2,
      titleKey: 'modules.sha256.steps.step2.title',
      badgeKey: 'modules.sha256.steps.step2.badge',
      descriptionKey: 'modules.sha256.steps.step2.description',
      duration: 5,
      camera: {
        x: 0,
        y: 10,
        scale: 1.3,
        rotation: 0,
      },
    },
    {
      id: 'sha256-compression-loop',
      stepNumber: 3,
      titleKey: 'modules.sha256.steps.step3.title',
      badgeKey: 'modules.sha256.steps.step3.badge',
      descriptionKey: 'modules.sha256.steps.step3.description',
      duration: 7,
      camera: {
        x: 0,
        y: 20,
        scale: 1.25,
        rotation: 0,
      },
    },
    {
      id: 'sha256-digest-output',
      stepNumber: 4,
      titleKey: 'modules.sha256.steps.step4.title',
      badgeKey: 'modules.sha256.steps.step4.badge',
      descriptionKey: 'modules.sha256.steps.step4.description',
      duration: 5.5,
      camera: {
        x: 0,
        y: 0,
        scale: 1.0,
        rotation: 0,
      },
    },
  ],
}
