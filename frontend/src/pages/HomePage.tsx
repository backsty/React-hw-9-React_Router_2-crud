import React, { useEffect, memo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PostList from '../components/PostList';
import { getPosts } from '../api/postApi';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const queryClient = useQueryClient();

  // Используем оптимизацию React Query с prefetching
  useEffect(() => {
    // Предварительная загрузка постов
    queryClient.prefetchQuery({
      queryKey: ['posts'],
      queryFn: getPosts,
    });
  }, [queryClient]);

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 60 * 1000, // Данные считаются свежими в течение 1 минуты
    refetchOnWindowFocus: false,
  });

  return (
    <div className="home-page">
      <PostList posts={posts} isLoading={isLoading} error={error as Error | null} />
    </div>
  );
};

export default memo(HomePage);
