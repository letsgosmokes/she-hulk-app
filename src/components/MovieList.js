import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

function MovieList() {
    const { movies, searchTerm, setSearchTerm } = useContext(MovieContext);

    return (
        <div>
            {/* <h1>Movie List</h1> */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="movie-grid">
                {movies.map(movie => (
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
