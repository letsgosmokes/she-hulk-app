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
        <div>
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Running Time:</strong> {movie.Runtime}</p>
            <p><strong>Rating:</strong> {movie.imdbRating}/10</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
        </div>
    );
}

export default MovieDetail;
