import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import theme, { cacheRtl } from './utils/theme';

// Apply RTL direction to the HTML body
document.body.setAttribute('dir', 'rtl');

ReactDOM.createRoot(document.getElementById('root')).render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </CacheProvider>
);
