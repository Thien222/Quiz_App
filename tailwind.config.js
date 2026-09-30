/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cream: '#FFF7F9',
        ink: '#3B1C54',
        muted: '#7E638D',
        blush: '#F472B6',
        rose: '#DB2777',
        lavender: '#A78BFA',
        violet: '#8B5CF6',
        peach: '#FDBA74',
      },
      borderRadius: { card: '28px' },
    },
  },
  plugins: [],
};
