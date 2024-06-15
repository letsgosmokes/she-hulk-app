import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [page, setPage] = useState(1);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=b9bd48a6&s=drive&page=${page}`);
            setMovies(prev => [...prev, ...response.data.Search]); // append new data after scrolling
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchMovies(); // call api when page changes
    }, [page]);

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

    // infinite scrolling
    const handleInfiniteScroll = async () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight) {
                setPage(prevPage => prevPage + 1);

            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll)
    }, []);

    return (
        <MovieContext.Provider value={{ movies, searchTerm, setSearchTerm, suggestions }}>
            {children}
        </MovieContext.Provider>
    );
};