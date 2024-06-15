import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const LazyMovieList = lazy(() => import('../components/MovieList')); // Lazy import MovieList component
const LazyMovieDetail = lazy(() => import('../components/MovieDetail')); // Lazy import MovieDetail component

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyMovieList />
                </Suspense>}
            />
            <Route path="/movie/:id" element={
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyMovieDetail />
                </Suspense>}
            />
        </Routes>
    );
};

export default AppRoutes;
