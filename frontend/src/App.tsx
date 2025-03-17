import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/App.css';

// Используем ленивую загрузку компонентов для улучшения производительности
const HomePage = lazy(() => import('./pages/HomePage'));
const NewPostPage = lazy(() => import('./pages/NewPostPage'));
const PostPage = lazy(() => import('./pages/PostPage'));

// Настраиваем React Query для оптимальной производительности
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 минута
      gcTime: 5 * 60 * 1000, // 5 минут (заменяет устаревшее свойство cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-container">
          <Suspense fallback={<div className="loader">Загрузка...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts/new" element={<NewPostPage />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
      {/* ReactQueryDevtools удалено, так как модуль не найден */}
    </QueryClientProvider>
  );
};

export default App;
