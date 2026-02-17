import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, useRouter } from './router';
import { routes, type RoutePath } from './router/lazyRoutes';
import './styles/tailwind.css';
import './styles/app.css';

function RouteLoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#070d1a',
        color: '#94a3b8',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      Loading...
    </div>
  );
}

function RouterOutlet() {
  const { path } = useRouter();
  const LazyComponent = routes[path as RoutePath];
  const PageComponent = LazyComponent || routes['/'];
  return PageComponent ? <PageComponent /> : <RouteLoadingFallback />;
}

function MinimalApp() {
  return (
    <RouterProvider>
      <Suspense fallback={<RouteLoadingFallback />}>
        <RouterOutlet />
      </Suspense>
    </RouterProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MinimalApp />
  </React.StrictMode>
);
