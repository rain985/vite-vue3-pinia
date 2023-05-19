import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'
import viteCompression from 'vite-plugin-compression'
import { wrapperEnv } from './src/utils/getEnv'
import { visualizer } from 'rollup-plugin-visualizer'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    base: './',
    server: {
      https: false,
      port: viteEnv.VITE_PORT,
      host: '0.0.0.0',
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'https://mock.mengxuegu.com/mock/6461a1817ba95d67784d7059',
          changeOrigin: true
        }
      }
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOB_APP_TITLE
          }
        }
      }),
      eslintPlugin,
      // 是否允许使用jsx语法
      vueJsx(),
      vueSetupExtend,
      // * 是否生成包预览(分析依赖包大小,方便做优化处理)
      viteEnv.VITE_REPORT && visualizer(),
      // * gzip compress
      viteEnv.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz'
        }),
      // * cdn 引入（vue按需引入会导致依赖vue的插件出现问题(列如:pinia/vuex)）
      importToCDN({
        modules: [
          // {
          // 	name: "vue",
          // 	var: "Vue",
          // 	path: "https://unpkg.com/vue@next"
          // },
        ]
      })
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve(__dirname, 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
        // find: '@',
        // replacement: './src'
      }
    },
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: true
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/style/var.less";'
        }
      }
    }
  }
})
