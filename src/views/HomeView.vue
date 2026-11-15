<template>
  <div ref="homeContainerRef" class="relative w-full min-h-screen overflow-x-hidden flex flex-col justify-between">
    <!-- 酷炫动态粒子交互背景 Canvas -->
    <canvas
      ref="particleCanvasRef"
      class="pointer-events-auto absolute inset-0 w-full h-[700px] z-0 opacity-60 dark:opacity-80"
    ></canvas>

    <!-- 顶部多重绚丽环境流光 (Ambient Glow) -->
    <div class="pointer-events-none absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-purple-500/15 dark:bg-purple-600/20 blur-3xl rounded-full"></div>
    <div class="pointer-events-none absolute top-28 right-1/4 translate-x-1/2 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-600/20 blur-3xl rounded-full"></div>
    <div class="pointer-events-none absolute top-[520px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl rounded-full"></div>

    <!-- 首页主要内容 -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 flex flex-col gap-16 md:gap-20">
      <!-- ================= 1. HERO 视效头部 ================= -->
      <section class="hero-section flex flex-col items-center text-center pt-8 md:pt-14 pb-2">
        <!-- 顶部光效微标 -->
        <div class="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-xs font-semibold text-purple-600 dark:text-purple-300 mb-6 shadow-sm shadow-purple-500/10">
          <span class="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
          <span>{{ t('home.heroBadge') }}</span>
        </div>

        <!-- 主标题 -->
        <h1 class="hero-title text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 select-none">
          <span class="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
            {{ t('home.heroTitle') }}
          </span>
          <span class="text-slate-800 dark:text-slate-100 ml-3">
            {{ t('app.subTitle') }}
          </span>
        </h1>

        <!-- 标语描述 -->
        <p class="hero-desc max-w-3xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          {{ t('home.heroDesc') }}
        </p>

        <!-- 酷炫 Command Palette 搜索条 (点击呼出全局搜索) -->
        <div class="hero-search w-full max-w-2xl mb-8">
          <button
            class="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-purple-500/5 hover:shadow-purple-500/20 hover:border-purple-500/60 dark:hover:border-purple-400/60 transition-all duration-300 group text-left"
            @click="isSearchOpen = true"
          >
            <div class="flex items-center gap-3 text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
              <span class="text-lg">🔍</span>
              <span class="text-xs sm:text-sm font-medium">
                {{ t('home.searchBarPlaceholder') }}
              </span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <kbd class="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                Ctrl K
              </kbd>
            </div>
          </button>
        </div>

        <!-- 平台核心数据看板 -->
        <div class="hero-stats grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col items-center shadow-sm">
            <span class="text-2xl sm:text-3xl font-extrabold font-mono text-purple-600 dark:text-purple-400">2</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">大硬核技术分类</span>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col items-center shadow-sm">
            <span class="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">6</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{{ t('home.stats.modules') }}</span>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col items-center shadow-sm">
            <span class="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">24</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{{ t('home.stats.steps') }}</span>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col items-center shadow-sm">
            <span class="text-2xl sm:text-3xl font-extrabold font-mono text-pink-600 dark:text-pink-400">100%</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{{ t('home.stats.openSource') }}</span>
          </div>
        </div>
      </section>

      <!-- ================= 2. 核心特性三剑客 ================= -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="feature-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-purple-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 group">
          <div class="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
            🎥
          </div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
            {{ t('home.features.cameraTitle') }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('home.features.cameraDesc') }}
          </p>
        </div>

        <div class="feature-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-indigo-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 group">
          <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
            ⏱️
          </div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
            {{ t('home.features.timelineTitle') }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('home.features.timelineDesc') }}
          </p>
        </div>

        <div class="feature-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-pink-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 group">
          <div class="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
            🧪
          </div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
            {{ t('home.features.labTitle') }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('home.features.labDesc') }}
          </p>
        </div>
      </section>

      <!-- ================= 3. 动画分类核心展区 (全新酷炫大卡片，不展示所有零散动画) ================= -->
      <section id="categories" class="space-y-8">
        <div class="flex flex-col items-center text-center gap-2">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20">
            <span>✨ CATEGORIES MATRIX</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {{ t('home.categorySectionTitle') }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            {{ t('home.categorySectionSubtitle') }}
          </p>
        </div>

        <!-- 两大技术分类酷炫展示大卡片网格 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="cat in categorizedModules"
            :key="cat.id"
            class="category-card relative p-8 sm:p-10 rounded-[32px] border transition-all duration-500 flex flex-col justify-between overflow-hidden group shadow-lg"
            :class="cat.id === 'network'
              ? 'border-blue-500/30 hover:border-blue-400/80 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-cyan-500/10 hover:shadow-blue-500/20 dark:from-blue-950/40 dark:via-slate-900/80 dark:to-cyan-950/30'
              : 'border-amber-500/30 hover:border-amber-400/80 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-pink-500/10 hover:shadow-amber-500/20 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-pink-950/30'"
          >
            <!-- 背景呼吸光晕球 -->
            <div
              class="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500 blur-2xl"
              :style="{ backgroundColor: cat.color }"
            ></div>

            <div class="relative z-10 space-y-6">
              <!-- 卡片头部：图标与元标签 -->
              <div class="flex items-center justify-between">
                <div
                  class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  :style="{
                    background: `linear-gradient(135deg, ${cat.color}33, ${cat.color}11)`,
                    border: `1.5px solid ${cat.color}66`
                  }"
                >
                  <span>{{ cat.icon }}</span>
                </div>

                <div class="flex flex-col items-end gap-1.5">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-mono font-bold border backdrop-blur-md"
                    :style="{
                      color: cat.color,
                      borderColor: `${cat.color}44`,
                      backgroundColor: `${cat.color}15`
                    }"
                  >
                    {{ cat.modules.length }} 个技术模块
                  </span>
                  <span class="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    ID: {{ cat.id }}
                  </span>
                </div>
              </div>

              <!-- 分类标题与详述 -->
              <div>
                <h3 class="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                  {{ t(cat.titleKey) }}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
                  {{ t(cat.descriptionKey) }}
                </p>
              </div>

              <!-- 涵盖模块技术胶囊清单 -->
              <div class="space-y-2 pt-2">
                <span class="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {{ t('home.categoryIncludes') }}
                </span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="mod in cat.modules"
                    :key="mod.id"
                    class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/70 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-sm group-hover:border-purple-400/50 transition-colors"
                  >
                    <span class="w-2 h-2 rounded-full shrink-0" :style="{ backgroundColor: mod.categoryColor }"></span>
                    <span>{{ t(mod.titleKey) }}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- 卡片底部进入分类专页动作栏 -->
            <div class="relative z-10 pt-6 mt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
              <div class="text-[11px] font-mono text-slate-400">
                /category/{{ cat.id }}
              </div>
              <router-link
                :to="'/category/' + cat.id"
                class="px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-lg group-hover:scale-105 active:scale-95"
                :style="{
                  background: `linear-gradient(135deg, ${cat.color}, #9333ea)`
                }"
              >
                <span>{{ t('home.exploreCategory') }}</span>
                <span class="group-hover:translate-x-1 transition-transform">→</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= 4. 底部探索引导大横幅 ================= -->
      <section class="p-8 sm:p-12 rounded-[32px] border border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-pink-900/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div class="space-y-2 text-center md:text-left">
          <h3 class="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">
            {{ t('home.readyToExplore') }}
          </h3>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            {{ t('home.readyDesc') }}
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <button
            class="px-5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:border-purple-400 transition-colors flex items-center gap-1.5"
            @click="isSearchOpen = true"
          >
            <span>🔍</span>
            <span>全局搜索</span>
          </button>
          <router-link
            to="/category/network"
            class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            开启网络通信专页 →
          </router-link>
        </div>
      </section>
    </div>

    <!-- 全局动画搜索框模态框 -->
    <GlobalSearchModal v-model="isSearchOpen" />

    <!-- 底部版权信息 -->
    <footer class="w-full py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60">
      <span>🍬 糖果动画 (Candy Animation) &copy; 2026. Built with Vue 3, GSAP & Tailwind CSS. Released under MIT License.</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { getCategorizedModules } from '@/modules'
import GlobalSearchModal from '@/components/GlobalSearchModal.vue'

const { t } = useI18n()
const categorizedModules = getCategorizedModules()

// 全局搜索弹窗状态
const isSearchOpen = ref<boolean>(false)

// 粒子交互画布
const homeContainerRef = ref<HTMLElement | null>(null)
const particleCanvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

function initParticleCanvas(): void {
  const canvas = particleCanvasRef.value
  if (!canvas || typeof canvas.getContext !== 'function') return
  if (typeof window !== 'undefined' && !(window as any).CanvasRenderingContext2D) {
    return
  }
  let ctx: CanvasRenderingContext2D | null = null
  try {
    ctx = canvas.getContext('2d')
  } catch {
    return
  }
  if (!ctx) return

  let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
  let height = (canvas.height = 700)

  const handleResize = (): void => {
    if (!canvas) return
    width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
    height = canvas.height = 700
  }
  window.addEventListener('resize', handleResize)

  const colors = ['#a855f7', '#6366f1', '#ec4899', '#06b6d4', '#f59e0b', '#3b82f6']
  const particles: Particle[] = []
  const count = Math.min(Math.floor(width / 18), 50)

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      radius: Math.random() * 2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  }

  // 鼠标交互
  let mouseX = -1000
  let mouseY = -1000
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  })
  canvas.addEventListener('mouseleave', () => {
    mouseX = -1000
    mouseY = -1000
  })

  function draw(): void {
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)

    // 更新与绘制粒子
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1

      // 鼠标吸引斥力
      const dx = mouseX - p.x
      const dy = mouseY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 130) {
        p.x -= (dx / dist) * 1.8
        p.y -= (dy / dist) * 1.8
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()

      // 粒子间连线
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const d2 = Math.hypot(p.x - p2.x, p.y - p2.y)
        if (d2 < 110) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.28 * (1 - d2 / 110)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw)
  }

  draw()
}

onMounted(() => {
  initParticleCanvas()

  // GSAP 酷炫入场动效编排
  if (!homeContainerRef.value) return
  const q = gsap.utils.selector(homeContainerRef.value)
  const badge = q('.hero-badge')
  const title = q('.hero-title')
  const desc = q('.hero-desc')
  const searchBar = q('.hero-search')
  const stats = q('.hero-stats > div')
  const featureCards = q('.feature-card')
  const categoryCards = q('.category-card')

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  if (badge.length) {
    tl.fromTo(
      badge,
      { scale: 0.6, opacity: 0, y: -20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(2)' }
    )
  }
  if (title.length) {
    tl.fromTo(
      title,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
      '-=0.4'
    )
  }
  if (desc.length) {
    tl.fromTo(
      desc,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.5'
    )
  }
  if (searchBar.length) {
    tl.fromTo(
      searchBar,
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )
  }
  if (stats.length) {
    tl.fromTo(
      stats,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.3'
    )
  }
  if (featureCards.length) {
    tl.fromTo(
      featureCards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 },
      '-=0.3'
    )
  }
  if (categoryCards.length) {
    tl.fromTo(
      categoryCards,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8 },
      '-=0.4'
    )
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>
