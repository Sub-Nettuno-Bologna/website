import theme from './src/theme';

module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        blue: { nettuno: theme.blue },
      },
    },
  },
};
