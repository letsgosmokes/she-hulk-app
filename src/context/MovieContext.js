import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://www.omdbapi.com/?apikey=b9bd48a6&s=drive&page=1')
            .then(response => {
                setMovies(response.data.Search);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredMovies = movies.filter(movie =>
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MovieContext.Provider value={{ movies: filteredMovies, searchTerm, setSearchTerm }}>
            {children}
        </MovieContext.Provider>
    );
};
