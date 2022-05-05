module.exports = {
  content: ['./src/modules/**/*.{js,ts,tsx,jsx}', './src/components/**/*.{js,ts,tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        chi: ['YCBFSDLA', 'sans-serif'],
      },
      colors: {
        primary: '#8c080d',
        secondary: '#f7941d',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
