module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(from)-./,
    },
    {
      pattern: /(to)-./,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        ailerons: ["Ailerons", "Typeface"],
        cooperHewittBody: ["CooperHewittBody", "Book"],
        cooperHewittTitle: ["CooperHewittTitle", "BoldItalic"],
      },
    },
  },
  plugins: [],
}
