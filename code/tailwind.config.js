module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ailerons: ["Ailerons", "Typeface"],
        cooperHewittBody: ["CooperHewittBody", "Book"],
        cooperHewittTitle: ["CooperHewittTitle", "BoldItalic"],
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img"
          }
          return `${extType}/[name]-[hash][extname]`
        },
      },
    },
  },
  plugins: [],
}
