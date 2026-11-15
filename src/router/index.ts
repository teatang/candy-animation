import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { getModuleById, getCategoryById, animationCategories } from '@/modules'
import HomeView from '@/views/HomeView.vue'
import AnimationStageView from '@/views/AnimationStageView.vue'
import CategoryView from '@/views/CategoryView.vue'

/**
 * 路由表配置
 * - /: 平台视觉首页 (炫酷粒子网格、分类总览与特性介绍)
 * - /category/:categoryId: 各技术动画分类独立展示页面 (例如 /category/network, /category/crypto)
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
    path: '/category',
    redirect: () => `/category/${animationCategories[0]?.id || 'network'}`,
  },
  {
    path: '/category/:categoryId',
    name: 'Category',
    component: CategoryView,
    props: true,
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

// 全局路由守卫：若访问未知分类或未知模块，重定向至首页
router.beforeEach((to) => {
  if (to.name === 'Category') {
    const categoryId = to.params.categoryId as string
    if (!getCategoryById(categoryId)) {
      return '/'
    }
  }
  if (to.name === 'AnimationStage') {
    const moduleId = to.params.moduleId as string
    if (!getModuleById(moduleId)) {
      return '/'
    }
  }
  return true
})
