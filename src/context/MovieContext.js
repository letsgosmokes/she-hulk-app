import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        axios.get('https://www.omdbapi.com/?apikey=b9bd48a6&s=drive&page=1')
            .then(response => {
                setMovies(response.data.Search);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
          setSuggestions([]);
        } else {
          const filteredSuggestions = movies.filter(movie =>
            movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
        }
      }, [searchTerm, movies]);

    return (
        <MovieContext.Provider value={{ movies, searchTerm, setSearchTerm, suggestions }}>
            {children}
        </MovieContext.Provider>
    );
};
