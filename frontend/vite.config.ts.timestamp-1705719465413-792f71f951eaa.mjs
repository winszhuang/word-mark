// vite.config.ts
import { defineConfig } from "file:///C:/side%20project/words/frontend/node_modules/vitest/dist/config.js";
import vue from "file:///C:/side%20project/words/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { crx } from "file:///C:/side%20project/words/frontend/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "CRXJS Vue Vite Example",
  version: "1.0.0",
  action: { default_popup: "index.html" },
  permissions: ["tabs"],
  options_page: "options.html",
  background: {
    service_worker: "src/background.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content-script/main.ts"]
    }
  ]
};

// vite.config.ts
import eslintPlugin from "file:///C:/side%20project/words/frontend/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [vue(), crx({ manifest: manifest_default }), eslintPlugin({ cache: false })],
  test: {
    // include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environment: "jsdom"
  }
  // https://blog.meathill.com/extension-2/create-chrome-chatgpt-sidepanel-extension-with-crxjs-vite-1.html
  // 注意，这段配置很关键，请保证开发端口与 hmr 端口一致。不知道为何，插件生成的扩展里缺少 5173 默认值。
  // server: {
  //   strictPort: true,
  //   port: 5173,
  //   hmr: {
  //     clientPort: 5173
  //   },
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHNpZGUgcHJvamVjdFxcXFx3b3Jkc1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcc2lkZSBwcm9qZWN0XFxcXHdvcmRzXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9zaWRlJTIwcHJvamVjdC93b3Jkcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0Lmpzb24nIGFzc2VydCB7IHR5cGU6ICdqc29uJyB9IC8vIE5vZGUgPj0xN1xyXG5pbXBvcnQgZXNsaW50UGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpLCBjcngoeyBtYW5pZmVzdCB9KSwgZXNsaW50UGx1Z2luKHsgY2FjaGU6IGZhbHNlIH0pXSxcclxuICB0ZXN0OiB7XHJcbiAgICAvLyBpbmNsdWRlOiBbJ3NyYy8qKi8qLnt0ZXN0LHNwZWN9LntqcyxtanMsY2pzLHRzLG10cyxjdHMsanN4LHRzeH0nXSxcclxuICAgIGVudmlyb25tZW50OiAnanNkb20nXHJcbiAgfVxyXG4gIC8vIGh0dHBzOi8vYmxvZy5tZWF0aGlsbC5jb20vZXh0ZW5zaW9uLTIvY3JlYXRlLWNocm9tZS1jaGF0Z3B0LXNpZGVwYW5lbC1leHRlbnNpb24td2l0aC1jcnhqcy12aXRlLTEuaHRtbFxyXG4gIC8vIFx1NkNFOFx1NjEwRlx1RkYwQ1x1OEZEOVx1NkJCNVx1OTE0RFx1N0Y2RVx1NUY4OFx1NTE3M1x1OTUyRVx1RkYwQ1x1OEJGN1x1NEZERFx1OEJDMVx1NUYwMFx1NTNEMVx1N0FFRlx1NTNFM1x1NEUwRSBobXIgXHU3QUVGXHU1M0UzXHU0RTAwXHU4MUY0XHUzMDAyXHU0RTBEXHU3N0U1XHU5MDUzXHU0RTNBXHU0RjU1XHVGRjBDXHU2M0QyXHU0RUY2XHU3NTFGXHU2MjEwXHU3Njg0XHU2MjY5XHU1QzU1XHU5MUNDXHU3RjNBXHU1QzExIDUxNzMgXHU5RUQ4XHU4QkE0XHU1MDNDXHUzMDAyXHJcbiAgLy8gc2VydmVyOiB7XHJcbiAgLy8gICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gIC8vICAgcG9ydDogNTE3MyxcclxuICAvLyAgIGhtcjoge1xyXG4gIC8vICAgICBjbGllbnRQb3J0OiA1MTczXHJcbiAgLy8gICB9LFxyXG4gIC8vIH0sXHJcbn0pXHJcbiIsICJ7XHJcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXHJcbiAgXCJuYW1lXCI6IFwiQ1JYSlMgVnVlIFZpdGUgRXhhbXBsZVwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXHJcbiAgXCJhY3Rpb25cIjogeyBcImRlZmF1bHRfcG9wdXBcIjogXCJpbmRleC5odG1sXCIgfSxcclxuICBcInBlcm1pc3Npb25zXCI6IFtcInRhYnNcIl0sXHJcbiAgXCJvcHRpb25zX3BhZ2VcIjogXCJvcHRpb25zLmh0bWxcIixcclxuICBcImJhY2tncm91bmRcIjoge1xyXG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcInNyYy9iYWNrZ3JvdW5kLnRzXCIsXHJcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxyXG4gIH0sXHJcbiAgXCJjb250ZW50X3NjcmlwdHNcIjogW1xyXG4gICAge1xyXG4gICAgICBcIm1hdGNoZXNcIjogW1wiPGFsbF91cmxzPlwiXSxcclxuICAgICAgXCJqc1wiOiBbXCJzcmMvY29udGVudC1zY3JpcHQvbWFpbi50c1wiXVxyXG4gICAgfVxyXG4gIF1cclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1IsU0FBUyxvQkFBb0I7QUFDblQsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsV0FBVzs7O0FDRnBCO0FBQUEsRUFDRSxrQkFBb0I7QUFBQSxFQUNwQixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxRQUFVLEVBQUUsZUFBaUIsYUFBYTtBQUFBLEVBQzFDLGFBQWUsQ0FBQyxNQUFNO0FBQUEsRUFDdEIsY0FBZ0I7QUFBQSxFQUNoQixZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakI7QUFBQSxNQUNFLFNBQVcsQ0FBQyxZQUFZO0FBQUEsTUFDeEIsSUFBTSxDQUFDLDRCQUE0QjtBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUNGOzs7QURiQSxPQUFPLGtCQUFrQjtBQUV6QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSwyQkFBUyxDQUFDLEdBQUcsYUFBYSxFQUFFLE9BQU8sTUFBTSxDQUFDLENBQUM7QUFBQSxFQUNsRSxNQUFNO0FBQUE7QUFBQSxJQUVKLGFBQWE7QUFBQSxFQUNmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
