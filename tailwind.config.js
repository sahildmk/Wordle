module.exports = {
  mode: "jit",
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        tiles: 'tiles 1s ease-in-out',
      },
      keyframes: {
        tiles: {
          '50%': { transform: 'scale(1.05)'  },
          '100%': { transform: 'scale(1.0)' }
        }
      }
    },
  },
  plugins: [],
}
