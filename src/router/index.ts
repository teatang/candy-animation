import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { DEFAULT_MODULE_ID, getModuleById } from '@/modules'
import AnimationStageView from '@/views/AnimationStageView.vue'

/**
 * 路由表配置
 * 支持每个动画拥有专属独立 URL (例如 /https-handshake, /md5-algorithm)
 * 并支持通过 ?step=N 参数直接跳转定位到特定步骤
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => `/${DEFAULT_MODULE_ID}`,
  },
  {
    path: '/:moduleId',
    name: 'AnimationStage',
    component: AnimationStageView,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: `/${DEFAULT_MODULE_ID}`,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局路由守卫：若访问未知模块，重定向至默认模块专属 URL
router.beforeEach((to) => {
  if (to.name === 'AnimationStage') {
    const moduleId = to.params.moduleId as string
    if (!getModuleById(moduleId)) {
      return `/${DEFAULT_MODULE_ID}`
    }
  }
})
