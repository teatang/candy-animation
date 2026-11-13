import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { getModuleById } from '@/modules'
import HomeView from '@/views/HomeView.vue'
import AnimationStageView from '@/views/AnimationStageView.vue'

/**
 * 路由表配置
 * - /: 平台视觉首页 (炫酷粒子网格、分类总览与特性介绍)
 * - /:moduleId: 各动画专属独立 URL (例如 /https-handshake, /tcp-handshake-wave)
 *   并支持通过 ?step=N 参数直接跳转定位到特定步骤
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/:moduleId',
    name: 'AnimationStage',
    component: AnimationStageView,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局路由守卫：若访问未知模块，重定向至首页
router.beforeEach((to) => {
  if (to.name === 'AnimationStage') {
    const moduleId = to.params.moduleId as string
    if (!getModuleById(moduleId)) {
      return '/'
    }
  }
  return true
})
