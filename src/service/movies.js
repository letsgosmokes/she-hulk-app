import axios from 'axios';

export const fetchMovies = async (page) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=b9bd48a6&s=drive&page=${page}`);
        return response.data.Search;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=b9bd48a6&i=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
