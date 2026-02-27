module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    '#0d0618',
          darker:  '#080412',
          purple:  '#1a0a2e',
          violet:  '#2d1557',
          cyan:    '#00d4ff',
          blue:    '#4f6ef7',
          magenta: '#e91e8c',
          pink:    '#ff6b9d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top left, #2d1557 0%, #0d0618 50%, #1a0408 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'btn-gradient':  'linear-gradient(135deg, #4f6ef7 0%, #00d4ff 100%)',
        'btn-gradient2': 'linear-gradient(135deg, #e91e8c 0%, #4f6ef7 100%)',
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
