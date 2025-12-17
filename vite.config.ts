import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { lingui } from '@lingui/vite-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const proxyConfig = {
    '/api/todos': {
      target: env.VITE_API_URL,
      changeOrigin: true,
      rewrite: (path: string) => {
        const newPath = path.replace(/^\/api\/todos/, '/todos')
        console.log(`🔄 [TODOS PROXY] ${path} → ${String(env.VITE_API_URL)}${newPath}`)
        return newPath
      },
    },
  }

  return {
    plugins: [
      devtools(),
      // NOTE: nitro() conflicts with a root-level server.ts (Nitro tries to import it).
      // We keep your custom Bun production server, so Nitro plugin stays disabled.
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
      tanstackStart({
        router: {
          routesDirectory: 'modules',
          routeFileIgnorePattern: '\\.ts$',
        },
      }),
      viteReact({
        babel: {
          plugins: ['@lingui/babel-plugin-lingui-macro'],
        },
      }),
      lingui(),
    ],
    server: {
      proxy: proxyConfig,
    },
  }
})
