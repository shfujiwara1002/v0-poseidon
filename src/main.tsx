import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { RouterProvider } from './router';
import './styles/index.css';
import './utils/performance';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
