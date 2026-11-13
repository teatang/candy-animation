<template>
  <div class="min-h-screen flex flex-col bg-stage-light dark:bg-stage-dark text-slate-800 dark:text-slate-100 transition-colors duration-300">
    <!-- 顶部导航栏 (支持直接跳转各动画独立 URL) -->
    <HeaderNav
      :modules="animationModules"
      :current-module-id="currentModuleId"
      @select-module="handleSelectModule"
      @copy-direct-url="handleCopyDirectUrl"
    />

    <!-- 动态路由舞台视图 -->
    <main class="flex-1 flex flex-col justify-between overflow-hidden relative">
      <router-view :key="$route.params.moduleId as string" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { animationModules, DEFAULT_MODULE_ID } from '@/modules'
import HeaderNav from '@/components/HeaderNav.vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// 当前激活的模块 ID (基于路由 params.moduleId)
const currentModuleId = computed<string>(() => {
  return (route.params.moduleId as string) || DEFAULT_MODULE_ID
})

/**
 * 切换动画模块：跳转至对应动画专属独立 URL
 */
function handleSelectModule(moduleId: string): void {
  if (currentModuleId.value === moduleId) return
  router.push(`/${moduleId}`)
}

/**
 * 复制当前动画直达独立 URL 至剪贴板
 */
async function handleCopyDirectUrl(): Promise<void> {
  try {
    const directUrl = window.location.href
    await navigator.clipboard.writeText(directUrl)
    ElMessage.success({
      message: t('nav.copySuccess'),
      grouping: true,
    })
  } catch {
    ElMessage.warning(t('nav.copyFailed'))
  }
}
</script>
