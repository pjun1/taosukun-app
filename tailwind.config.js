/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#DAA520",        // ゴールドカラー
        "gold-dark": "#B8860B", // 少し暗いゴールド
        brown: {
          700: "#4A2C2A",       // ブラウンカラー
          800: "#3B1F1B",       // 暗いブラウン
        },
      },
    },
  },
  plugins: [],
};
