/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare Workers 入口文件
 * 负责分发处理 SPA 前端静态资源 (Single Page Application Fallback)
 */
export interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 委托给 Cloudflare Workers Static Assets 执行托管与 SPA 回退
    return env.ASSETS.fetch(request)
  },
}
