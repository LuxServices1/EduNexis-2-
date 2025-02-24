import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssVarsProvider, experimental_extendTheme } from '@mui/material/styles';

const theme = experimental_extendTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssVarsProvider theme={theme} defaultMode="system">
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
