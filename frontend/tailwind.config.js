// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: '#1976d2', // Material-UI Primary Color
        secondary: '#9c27b0', // Material-UI Secondary Color
      },
      screens: {
        'xs': '320px',    // Extra Small screens
        'sm': '480px',    // Small screens (mobile)
        'md': '768px',    // Medium screens (tablet)
        'lg': '1024px',   // Large screens (desktop)
        'xl': '1280px',   // Extra Large screens (large desktop)
        '2xl': '1536px',  // 2x Extra Large screens (larger desktop)
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
