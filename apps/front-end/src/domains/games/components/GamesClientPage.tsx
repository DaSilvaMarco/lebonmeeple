'use client';

import React, { useEffect, useState } from 'react';
import Pagination from '@frontend/domains/shared/pagination/Pagination';
import GamesPage from './GamesPage';
import PostsPageSkeleton from '@frontend/domains/post/pages/PostsPageSkeleton';
import { useDispatch } from 'react-redux';
import { getGames } from '../api/get-games';
import { gamesList } from '../slice';

const GamesClientPage = () => {
  const [totalPages, setTotalPages] = useState<number>(1);
  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchPosts = async (newPage = page) => {
    try {
      setIsLoading(true);
      const fetchedGames = await getGames({ limit: 9, page: newPage });
      dispatch(gamesList(fetchedGames.games));
      if (fetchedGames.totalPages) {
        setTotalPages(fetchedGames.totalPages);
      }
    } catch (err) {
      setError('Erreur lors du chargement des jeux');
      console.error('Error fetching games:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      {isLoading ? <PostsPageSkeleton /> : <GamesPage />}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </>
  );
};

export default GamesClientPage;
