// src/theme.js
import { createTheme } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

const font = "'Rubik', sans-serif";

// Create a theme with RTL support
const theme = createTheme(
  {
    direction: 'rtl', // Set the direction to RTL
    typography: {
      fontFamily: font,
      button: {
        textTransform: 'none',
      },
    },
  },

  faIR // Load Farsi (Persian) locale
);

// Create a cache with RTL support
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default theme;
