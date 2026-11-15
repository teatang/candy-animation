<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/75 backdrop-blur-md transition-opacity duration-200"
      @click.self="close"
    >
      <div
        class="w-full max-w-5xl h-[92vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all transform animate-in fade-in zoom-in-95 duration-200 text-slate-800 dark:text-slate-100"
      >
        <!-- 弹窗 Header 栏 -->
        <div class="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-slate-50/70 dark:bg-slate-800/50">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl shrink-0 border border-purple-500/20">
              📊
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 truncate">
                  {{ isZh ? diagramData?.titleZh : diagramData?.titleEn }}
                </h3>
                <span class="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 border border-purple-500/20 shrink-0">
                  {{ isZh ? diagramData?.diagramTypeZh : diagramData?.diagramTypeEn }}
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {{ isZh ? diagramData?.descriptionZh : diagramData?.descriptionEn }}
              </p>
            </div>
          </div>

          <!-- 右侧操作工具栏 -->
          <div class="flex items-center gap-2 shrink-0">
            <!-- 视图 Tab 切换 -->
            <div class="flex p-0.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700/60 text-xs">
              <button
                class="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5"
                :class="activeTab === 'preview' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                @click="activeTab = 'preview'"
              >
                <span>🖼️</span>
                <span>{{ isZh ? '可视化图表' : 'Diagram' }}</span>
              </button>
              <button
                class="px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5"
                :class="activeTab === 'source' ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
                @click="activeTab = 'source'"
              >
                <span>📝</span>
                <span>{{ isZh ? 'Mermaid 源码' : 'Source' }}</span>
              </button>
            </div>

            <!-- 一键复制源码按钮 -->
            <button
              class="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              :title="isZh ? '复制 Mermaid 源码' : 'Copy Mermaid Code'"
              @click="handleCopyCode"
            >
              <span>📋</span>
              <span class="hidden sm:inline">{{ isZh ? '复制源码' : 'Copy' }}</span>
            </button>

            <!-- 关闭按钮 -->
            <button
              class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
              title="关闭"
              @click="close"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- 弹窗主要内容区域 -->
        <div class="flex-1 overflow-hidden flex flex-col relative bg-slate-50/30 dark:bg-slate-950/30">
          <!-- 1. 可视化图表渲染视图 -->
          <div
            v-show="activeTab === 'preview'"
            class="flex-1 flex flex-col overflow-hidden relative"
          >
            <!-- 缩放与辅助控制条 -->
            <div class="px-5 py-2 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-100/50 dark:bg-slate-900/60 shrink-0">
              <!-- 左侧缩放操作区 -->
              <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <span class="font-medium text-xs">{{ isZh ? '🔍 视图缩放：' : '🔍 Zoom:' }}</span>
                <button
                  type="button"
                  class="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-purple-400 flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
                  :title="isZh ? '缩小视图' : 'Zoom Out'"
                  @click="zoomOut"
                >
                  −
                </button>
                <span class="w-12 text-center font-mono text-xs font-semibold text-purple-600 dark:text-purple-400 select-none">
                  {{ zoomLevel }}%
                </span>
                <button
                  type="button"
                  class="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-purple-400 flex items-center justify-center font-bold text-sm shadow-xs transition-colors"
                  :title="isZh ? '放大视图' : 'Zoom In'"
                  @click="zoomIn"
                >
                  +
                </button>
                <button
                  type="button"
                  class="px-2 h-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-purple-400 font-mono text-[11px] shadow-xs transition-colors"
                  :title="isZh ? '恢复原始 100% 比例' : 'Reset Zoom to 100%'"
                  @click="resetZoom"
                >
                  {{ isZh ? '重置 100%' : 'Reset' }}
                </button>
              </div>

              <!-- 右侧辅助工具：导出 SVG / 重新渲染 -->
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="h-7 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-purple-400 text-xs font-medium flex items-center gap-1 shadow-xs transition-colors"
                  :title="isZh ? '下载当前 Mermaid 矢量图 SVG 文件' : 'Download SVG'"
                  @click="exportSvg"
                >
                  <span>⬇️</span>
                  <span>{{ isZh ? '导出 SVG' : 'Export SVG' }}</span>
                </button>
                <button
                  type="button"
                  class="h-7 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-purple-400 text-xs font-medium flex items-center gap-1 shadow-xs transition-colors"
                  :title="isZh ? '刷新重新渲染' : 'Re-render'"
                  @click="renderMermaidChart"
                >
                  <span>🔄</span>
                  <span>{{ isZh ? '重新渲染' : 'Reload' }}</span>
                </button>
              </div>
            </div>

            <!-- 可视化滚动展示主视窗（避免 justify-center 导致的顶部裁剪 BUG） -->
            <div class="flex-1 overflow-auto p-4 sm:p-6 custom-scrollbar">
              <!-- 渲染错误警告 -->
              <div
                v-if="renderError"
                class="p-6 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs text-center max-w-md mx-auto my-12"
              >
                <div class="text-2xl mb-2">⚠️</div>
                <p class="font-bold mb-1">{{ isZh ? '图表渲染异常' : 'Render Failed' }}</p>
                <p class="opacity-80 mb-3">{{ renderError }}</p>
                <button
                  type="button"
                  class="px-3.5 py-1.5 rounded-lg bg-red-600 text-white font-medium text-xs hover:bg-red-500 transition-colors"
                  @click="activeTab = 'source'"
                >
                  {{ isZh ? '查看原生 Mermaid 源码' : 'View Raw Mermaid Code' }}
                </button>
              </div>

              <!-- 渲染加载中 -->
              <div
                v-else-if="isLoading"
                class="flex flex-col items-center justify-center py-28 gap-3 text-slate-400"
              >
                <div class="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs font-mono">{{ isZh ? '正在编译渲染 Mermaid 矢量图...' : 'Rendering Mermaid SVG...' }}</span>
              </div>

              <!-- SVG 矢量图展示区域（支持缩放与双向滚动） -->
              <div
                v-else
                class="min-w-fit w-full flex items-start justify-center pb-8"
              >
                <div
                  ref="mermaidSvgContainerRef"
                  class="mermaid-svg-container transition-transform duration-150 origin-top p-6 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md"
                  :style="{ transform: `scale(${zoomLevel / 100})` }"
                  v-html="renderedSvg"
                ></div>
              </div>
            </div>
          </div>

          <!-- 2. Mermaid 源代码视图 -->
          <div
            v-show="activeTab === 'source'"
            class="flex-1 overflow-auto p-4 sm:p-6 custom-scrollbar space-y-3"
          >
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span class="font-mono font-semibold">{{ isZh ? 'Mermaid 代码定义：' : 'Mermaid Syntax Definition:' }}</span>
              <span class="text-[11px] opacity-75">{{ isZh ? '支持直接粘贴至 GitHub、Notion、Obsidian 或 Markdown' : 'Paste into GitHub, Notion, or Markdown' }}</span>
            </div>

            <div class="relative group">
              <pre class="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto border border-slate-800 shadow-xl selection:bg-purple-600/40"><code>{{ diagramData?.code }}</code></pre>
              <button
                class="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-200 text-xs font-mono transition-colors shadow flex items-center gap-1.5"
                @click="handleCopyCode"
              >
                <span>📋</span>
                <span>{{ isZh ? '点击复制' : 'Copy' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 弹窗底部操作信息 -->
        <div class="px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 bg-slate-50/70 dark:bg-slate-800/50 shrink-0">
          <div class="flex items-center gap-2">
            <span>💡</span>
            <span>{{ isZh ? '提示：默认不需要展示，支持任意放大缩小或导出 SVG' : 'Tip: Hidden by default. Zoom, export, or view source anytime.' }}</span>
          </div>
          <button
            class="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-sm"
            @click="close"
          >
            {{ isZh ? '完成查看' : 'Done' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import mermaid from 'mermaid'
import { useTheme } from '@/composables/useTheme'
import { getMermaidDiagram } from '@/utils/mermaidDiagrams'

const props = defineProps<{
  modelValue: boolean
  moduleId: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { locale } = useI18n()
const { isDark } = useTheme()

const isZh = computed(() => locale.value === 'zh-CN')
const activeTab = ref<'preview' | 'source'>('preview')
const isLoading = ref<boolean>(false)
const renderError = ref<string | null>(null)
const renderedSvg = ref<string>('')
const mermaidSvgContainerRef = ref<HTMLElement | null>(null)

// 视图缩放等级 (50% ~ 200%)
const zoomLevel = ref<number>(100)

function zoomIn(): void {
  zoomLevel.value = Math.min(220, zoomLevel.value + 15)
}

function zoomOut(): void {
  zoomLevel.value = Math.max(50, zoomLevel.value - 15)
}

function resetZoom(): void {
  zoomLevel.value = 100
}

// 当前模块的 Mermaid 数据
const diagramData = computed(() => {
  return getMermaidDiagram(props.moduleId)
})

let renderCounter = 0

// 初始化与渲染 Mermaid SVG
async function renderMermaidChart(): Promise<void> {
  if (!diagramData.value) return
  isLoading.value = true
  renderError.value = null

  // 若在无真实浏览器的测试环境 (如 jsdom) 中跳过渲染以避免环境缺失 SVG/d3 异常
  const isJsdom = typeof navigator !== 'undefined' && (navigator.userAgent.includes('jsdom') || !!(window as any)._jsdom)
  if (isJsdom || (typeof window !== 'undefined' && !(window as any).SVGElement?.prototype?.getBBox)) {
    renderedSvg.value = `<div class="p-6 text-center text-xs text-slate-400 font-mono">Mermaid SVG Preview (${diagramData.value.diagramTypeZh})</div>`
    isLoading.value = false
    return
  }

  try {
    // 根据系统深浅主题深度定制高对比度配色变量
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark.value ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      themeVariables: isDark.value
        ? {
            darkMode: true,
            background: '#0f172a',
            primaryColor: '#8b5cf6',
            primaryTextColor: '#f8fafc',
            primaryBorderColor: '#a78bfa',
            lineColor: '#94a3b8',
            secondaryColor: '#38bdf8',
            tertiaryColor: '#1e293b',
            mainBkg: '#1e293b',
            nodeBorder: '#64748b',
            clusterBkg: '#0f172a',
            clusterBorder: '#334155',
            titleColor: '#f1f5f9',
            edgeLabelBackground: '#1e293b',
            actorBkg: '#1e293b',
            actorBorder: '#8b5cf6',
            actorTextColor: '#f8fafc',
            actorLineColor: '#64748b',
            signalColor: '#e2e8f0',
            signalTextColor: '#e2e8f0',
            labelBoxBkgColor: '#1e293b',
            labelBoxBorderColor: '#64748b',
            labelTextColor: '#f8fafc',
            loopTextColor: '#f8fafc',
            noteBorderColor: '#a855f7',
            noteBkgColor: '#2e1065',
            noteTextColor: '#f3e8ff',
            activationBorderColor: '#8b5cf6',
            activationBkgColor: '#3b0764',
            sequenceNumberColor: '#c084fc',
          }
        : {
            darkMode: false,
            background: '#ffffff',
            primaryColor: '#7c3aed',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#6d28d9',
            lineColor: '#64748b',
            secondaryColor: '#2563eb',
            tertiaryColor: '#f8fafc',
            mainBkg: '#f8fafc',
            nodeBorder: '#cbd5e1',
            clusterBkg: '#f1f5f9',
            clusterBorder: '#cbd5e1',
            titleColor: '#0f172a',
            edgeLabelBackground: '#ffffff',
            actorBkg: '#f8fafc',
            actorBorder: '#7c3aed',
            actorTextColor: '#0f172a',
            actorLineColor: '#94a3b8',
            signalColor: '#334155',
            signalTextColor: '#1e293b',
            noteBorderColor: '#c084fc',
            noteBkgColor: '#faf5ff',
            noteTextColor: '#581c87',
            activationBorderColor: '#7c3aed',
            activationBkgColor: '#ede9fe',
            sequenceNumberColor: '#7c3aed',
          },
      sequence: {
        actorFontSize: 13,
        messageFontSize: 12,
        noteFontSize: 12,
        useMaxWidth: false,
      },
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis',
      },
    })

    await nextTick()
    renderCounter++
    const safeModuleId = props.moduleId.replace(/[^a-zA-Z0-9]/g, '')
    const uniqueId = `mermaid-${safeModuleId}-${Date.now()}-${renderCounter}`

    // 清理可能遗留的旧临时 DOM 节点，避免 Mermaid 内部 ID 选择器碰撞
    if (typeof document !== 'undefined') {
      const oldElement = document.getElementById(uniqueId)
      if (oldElement) oldElement.remove()
      const oldContainer = document.getElementById(`d${uniqueId}`)
      if (oldContainer) oldContainer.remove()
    }

    const { svg } = await mermaid.render(uniqueId, diagramData.value.code)
    renderedSvg.value = svg
  } catch (err: any) {
    console.error('Mermaid render error:', err)
    renderError.value = err?.message || String(err)
  } finally {
    isLoading.value = false
  }
}

// 监听弹窗打开和模块切换
watch(
  () => [props.modelValue, props.moduleId, isDark.value],
  ([visible]) => {
    if (visible) {
      resetZoom()
      renderMermaidChart()
    }
  },
  { immediate: true }
)

function close(): void {
  emit('update:modelValue', false)
}

// 一键导出 SVG 矢量图文件
function exportSvg(): void {
  if (!renderedSvg.value) return
  try {
    const blob = new Blob([renderedSvg.value], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mermaid-${props.moduleId}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    ElMessage.success(isZh.value ? 'SVG 矢量图已成功导出下载！' : 'SVG exported successfully!')
  } catch (err) {
    console.error('Export SVG error:', err)
    ElMessage.warning(isZh.value ? '导出失败，请重试' : 'Export failed')
  }
}

async function handleCopyCode(): Promise<void> {
  if (!diagramData.value?.code) return
  try {
    await navigator.clipboard.writeText(diagramData.value.code)
    ElMessage.success({
      message: isZh.value ? 'Mermaid 图表源码已复制到剪贴板！' : 'Mermaid code copied to clipboard!',
      grouping: true,
    })
  } catch {
    ElMessage.warning(isZh.value ? '复制失败，请手动复制代码' : 'Copy failed, please copy manually')
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.35);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.6);
}

:deep(.mermaid-svg-container svg) {
  display: block;
  margin: 0 auto;
}
</style>
