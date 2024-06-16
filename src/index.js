import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import "../src/assets/styles/movie.css";

ReactDOM.render(
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
