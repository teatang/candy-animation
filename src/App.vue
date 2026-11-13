<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-stage-light dark:bg-stage-dark text-slate-800 dark:text-slate-100 transition-colors duration-300">
    <!-- 侧边导航栏 (大屏固定侧边栏 / 小屏轻量顶部栏与抽屉) -->
    <SidebarNav />

    <!-- 动态路由内容主舞台区域 -->
    <main class="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto relative">
      <router-view :key="($route.params.moduleId as string) || 'home'" />
    </main>
  </div>
</template>

<script setup lang="ts">
import SidebarNav from '@/components/SidebarNav.vue'
</script>
