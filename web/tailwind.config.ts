const grey = '#686868';

const theme = {
  black: '#24292e',
  blue: '#005ba7',
  grey,
  textSecondary: grey,
};

module.exports = {
  content: ['./src/**/*.{html,njk,md,liquid,js}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        blue: { nettuno: theme.blue },
      },
    },
  },
};
