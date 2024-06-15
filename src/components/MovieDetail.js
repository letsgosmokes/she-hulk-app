import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=b9bd48a6&i=${id}`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className='movie-detail'>
            <div className='movie-poster'><img src={movie.Poster} alt={movie.Title} /></div>
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
