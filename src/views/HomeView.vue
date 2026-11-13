<template>
  <div ref="homeContainerRef" class="relative w-full min-h-screen overflow-x-hidden flex flex-col justify-between">
    <!-- 酷炫动态粒子交互背景 Canvas -->
    <canvas
      ref="particleCanvasRef"
      class="pointer-events-auto absolute inset-0 w-full h-[640px] z-0 opacity-60 dark:opacity-75"
    ></canvas>

    <!-- 首页主要内容 -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex flex-col gap-16">
      <!-- ================= 1. HERO 视效头部 ================= -->
      <section class="hero-section flex flex-col items-center text-center pt-8 md:pt-14 pb-4">
        <!-- 顶部光效徽章 -->
        <div class="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-xs font-semibold text-purple-600 dark:text-purple-300 mb-6 shadow-sm">
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

        <!-- CTA 快捷动作按钮组 -->
        <div class="hero-actions flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <router-link
            to="/tcp-handshake-wave"
            class="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>{{ t('home.startExplore') }}</span>
          </router-link>

          <a
            href="#categories"
            class="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-700 dark:text-slate-200 font-bold text-sm hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>{{ t('home.browseCategories') }}</span>
          </a>
        </div>

        <!-- 平台核心数据看板 -->
        <div class="hero-stats grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col items-center shadow-sm">
            <span class="text-2xl sm:text-3xl font-extrabold font-mono text-purple-600 dark:text-purple-400">6</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{{ t('home.stats.modules') }}</span>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col items-center shadow-sm">
            <span class="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">24</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{{ t('home.stats.steps') }}</span>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col items-center shadow-sm">
            <span class="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">48</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{{ t('home.stats.tests') }}</span>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex flex-col items-center shadow-sm">
            <span class="text-2xl sm:text-3xl font-extrabold font-mono text-pink-600 dark:text-pink-400">100%</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{{ t('home.stats.openSource') }}</span>
          </div>
        </div>
      </section>

      <!-- ================= 2. 核心特性卡片三剑客 ================= -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="feature-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 flex flex-col gap-3 group">
          <div class="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🎥
          </div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
            {{ t('home.features.cameraTitle') }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('home.features.cameraDesc') }}
          </p>
        </div>

        <div class="feature-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col gap-3 group">
          <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            ⏱️
          </div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">
            {{ t('home.features.timelineTitle') }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {{ t('home.features.timelineDesc') }}
          </p>
        </div>

        <div class="feature-card p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-pink-500/50 hover:shadow-xl transition-all duration-300 flex flex-col gap-3 group">
          <div class="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
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

      <!-- ================= 3. 动画分类与卡片展示区 ================= -->
      <section id="categories" class="space-y-12">
        <div class="flex flex-col items-center text-center gap-2">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            {{ t('home.categorySectionTitle') }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            {{ t('home.categorySectionSubtitle') }}
          </p>
        </div>

        <!-- 循环渲染每一个大分类 -->
        <div
          v-for="cat in categorizedModules"
          :key="cat.id"
          class="category-group space-y-5"
        >
          <!-- 分类标题栏 -->
          <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ cat.icon }}</span>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                  {{ t(cat.titleKey) }}
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  {{ t(cat.descriptionKey) }}
                </p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              {{ cat.modules.length }} 个模块
            </span>
          </div>

          <!-- 分类下模块网格 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="mod in cat.modules"
              :key="mod.id"
              class="module-card p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div class="space-y-3.5">
                <!-- 卡片顶部元数据 -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-3 h-3 rounded-full"
                      :style="{ backgroundColor: mod.categoryColor }"
                    ></span>
                    <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {{ t(mod.categoryKey) }}
                    </span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {{ t('home.totalDuration', { sec: mod.totalDuration }) }}
                  </span>
                </div>

                <!-- 模块标题与描述 -->
                <div>
                  <h4 class="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {{ t(mod.titleKey) }}
                  </h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5 line-clamp-2">
                    {{ t(mod.summaryKey) }}
                  </p>
                </div>

                <!-- 步骤直达快捷锚点 (Deep-linking) -->
                <div class="space-y-1 pt-1">
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {{ t('home.stepsCount', { count: mod.steps.length }) }}：
                  </span>
                  <div class="flex flex-wrap gap-1.5">
                    <router-link
                      v-for="step in mod.steps"
                      :key="step.id"
                      :to="`/${mod.id}?step=${step.stepNumber}`"
                      class="px-2 py-1 rounded-lg text-[10px] font-mono border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-purple-400 hover:text-purple-600 transition-colors"
                      :title="t(step.titleKey)"
                    >
                      #{{ step.stepNumber }} {{ step.badgeKey ? t(step.badgeKey) : `Step ${step.stepNumber}` }}
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- 卡片底部跳转按钮 -->
              <div class="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span class="text-[11px] font-mono text-slate-400">
                  URL: /{{ mod.id }}
                </span>
                <router-link
                  :to="'/' + mod.id"
                  class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                >
                  <span>{{ t('home.launchModule') }}</span>
                  <span>→</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

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

const { t } = useI18n()
const categorizedModules = getCategorizedModules()

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
  // jsdom 环境中跳过 Canvas 绘制以避免 not-implemented 警告
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
  let height = (canvas.height = 640)

  const handleResize = (): void => {
    if (!canvas) return
    width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
    height = canvas.height = 640
  }
  window.addEventListener('resize', handleResize)

  const colors = ['#a855f7', '#6366f1', '#ec4899', '#06b6d4', '#f59e0b']
  const particles: Particle[] = []
  const count = Math.min(Math.floor(width / 20), 45)

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5,
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
      if (dist < 120) {
        p.x -= (dx / dist) * 1.5
        p.y -= (dy / dist) * 1.5
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()

      // 粒子间连线
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const d2 = Math.hypot(p.x - p2.x, p.y - p2.y)
        if (d2 < 100) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.25 * (1 - d2 / 100)})`
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

  // GSAP 酷炫入场动效
  if (!homeContainerRef.value) return
  const q = gsap.utils.selector(homeContainerRef.value)
  const badge = q('.hero-badge')
  const title = q('.hero-title')
  const desc = q('.hero-desc')
  const actions = q('.hero-actions')
  const stats = q('.hero-stats > div')
  const cards = q('.feature-card')
  const groups = q('.category-group')

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
  if (actions.length) {
    tl.fromTo(
      actions,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6 },
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
  if (cards.length) {
    tl.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 },
      '-=0.3'
    )
  }
  if (groups.length) {
    tl.fromTo(
      groups,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
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
