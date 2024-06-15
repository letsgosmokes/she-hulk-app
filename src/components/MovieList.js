import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

function MovieList() {
    const { movies, searchTerm, setSearchTerm, suggestions } = useContext(MovieContext);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        // Update filteredMovies when movies or searchTerm change
        setFilteredMovies(movies.filter(movie =>
          movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      }, [movies, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFilteredMovies(movies.filter(movie =>
            movie.Title.toLowerCase().includes(e.target.value.toLowerCase())
        ));
    };

    const handleSuggestionClick = (title) => {
        setSearchTerm(title);
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
                            <img src={movie.Poster} alt={movie.Title} />
                            <p>{movie.Title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
