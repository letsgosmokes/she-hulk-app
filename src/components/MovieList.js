import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { fallbackImgUrl } from '../utils/constants';
import { handleImageError } from '../utils/utilFn';

function MovieList() {
    const { movies, searchTerm, setSearchTerm, suggestions } = useContext(MovieContext);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    useEffect(() => {
        // Update debounced search term after 1 sec
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000);

        // Cleanup function to clear the timer if searchTerm changes before 1 sec
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        // Filter movies based on debouncedSearchTerm
        setFilteredMovies(movies.filter(movie =>
            movie.Title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        ));
    }, [movies, debouncedSearchTerm]);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value); // Update searchTerm immediately
    };

    const handleSuggestionClick = (title) => {
        setSearchTerm(title);
        setDebouncedSearchTerm(title); // Update debouncedSearchTerm immediately
        setFilteredMovies(movies.filter(movie =>
            movie.Title.toLowerCase() === title.toLowerCase()
        ));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map(suggestion => (
                        <li
                            key={suggestion.imdbID}
                            onClick={() => handleSuggestionClick(suggestion.Title)}
                        >
                            {suggestion.Title}
                        </li>
                    ))}
                </ul>
            )}
            <div className="movie-grid">
                {filteredMovies.map(movie => (
                    <div key={movie.imdbID} className="movie-card">
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img src={movie.Poster || fallbackImgUrl} alt={movie.Title} onError={handleImageError} />
                            <p>{movie.Title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
