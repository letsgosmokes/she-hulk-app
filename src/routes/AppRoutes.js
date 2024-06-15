import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieList from '../components/MovieList';
import MovieDetail from '../components/MovieDetail';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
    );
};

export default AppRoutes;
