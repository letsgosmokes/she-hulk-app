import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fallbackImgUrl } from '../utils/constants';
import { handleImageError } from '../utils/utilFn';
import Loader from './Loader';
import { fetchMovieDetails } from '../service/movies';
import { MovieContext } from '../context/MovieContext';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const { setSearchTerm } = useContext(MovieContext);

    const getDetailsOfMovie = async () => {
        try {
            const movieDetails = await fetchMovieDetails(id);
            if (movieDetails) {
                setMovie(movieDetails); // append new data after scrolling
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getDetailsOfMovie();
        setSearchTerm("");
    }, []);

    if (!movie) {
        return <Loader />;
    }

    return (
        <div className='movie-detail'>
            <div className='movie-poster'>
                <img src={movie.Poster || fallbackImgUrl} alt={movie.Title} onError={handleImageError} />
            </div>
            <h2 className='orange'>{movie.Title} ({movie.Year})</h2>
            <div className='movie-meta'>
                <p><span className='orange'><strong>Genre:</strong></span><br /> {movie.Genre}</p>
                <p><span className='orange'><strong>Running Time:</strong></span><br />  {movie.Runtime}</p>
                <p><span className='orange'><strong>Rating:</strong></span><br />  {movie.imdbRating}/10</p>
            </div>
            <p><span className='orange'><strong>Plot:</strong></span><br />  {movie.Plot}</p>
            <p><span className='orange'><strong>Actors:</strong></span><br /> {movie.Actors}</p>
        </div>
    );
}

export default MovieDetail;
