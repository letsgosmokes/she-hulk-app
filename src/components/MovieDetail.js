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
            <h2>{movie.Title} ({movie.Year})</h2>
            <div className='movie-meta'>
                <p><strong>Genre:</strong><br /> {movie.Genre}</p>
                <p><strong>Running Time:</strong><br />  {movie.Runtime}</p>
                <p><strong>Rating:</strong><br />  {movie.imdbRating}/10</p>
            </div>
            <p><strong>Plot:</strong><br />  {movie.Plot}</p>
            <p><strong>Actors:</strong><br /> {movie.Actors}</p>
        </div>
    );
}

export default MovieDetail;
