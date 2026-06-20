module.exports = {
  content: ['./*.html', './main.js'],
  theme: {
    extend: {
      colors: {
        sekomaGreen: '#2e7d32',
        sekomaGreenLight: '#4CAF50',
        sekomaYellow: '#F9A825',
        sekomaDark: '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  safelist: [
    'bg-white/15',
    'bg-sekomaGreen/30',
    'translate-y-full',
    'text-sekomaGreenLight',
    'text-sekomaYellow',
  ],
};
