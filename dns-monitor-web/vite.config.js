import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   '/api/dns': {
  //     target: 'http://192.168.1.186:8001',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, '')
  //   },
  // }
  server: {
    proxy: {
      '^/dns/.*': {
        target: 'http://192.168.1.186:8001',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

// export default {
//   css: {
//     preprocessorOptions: {
//       scss: {
//         // example : additionalData: `@import "./src/design/styles/variables";`
//         // dont need include file extend .scss
//         additionalData: `@import "./src/sass/variables";`
//       },
//     },
//   }
// }

module.exports = {
  devServer: {
    // proxy: 'http://192.168.1.186:8001'
      '/dns': {
        target: 'http://192.168.1.186:8001',
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
        // pathRewrite: {
        //   '^/services/todoService': '/'
        // }
    }
  }
}