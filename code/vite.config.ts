import { fileURLToPath, URL } from "url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: any) => {
          var extType = assetInfo.name.split(".").at(1)
          if (!/css/i.test(extType)) {
            if (/png|jpeg|jpg|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img"
            }
            if (/otf/i.test(extType)) {
              extType = "fonts"
            }
            return `assets/${extType}/[name]-[hash][extname]`
          } else {
            return `assets/[name]-[hash][extname]`
          }
        },
      },
    },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    hmr: {
      host: "localhost",
      protocol: "ws",
      port: 8090,
    },
  },
})
