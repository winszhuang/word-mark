import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' assert { type: 'json' } // Node >=17

export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
  ],
  // https://blog.meathill.com/extension-2/create-chrome-chatgpt-sidepanel-extension-with-crxjs-vite-1.html
  // 注意，这段配置很关键，请保证开发端口与 hmr 端口一致。不知道为何，插件生成的扩展里缺少 5173 默认值。
  // server: {
  //   strictPort: true,
  //   port: 5173,
  //   hmr: {
  //     clientPort: 5173
  //   },
  // },
})