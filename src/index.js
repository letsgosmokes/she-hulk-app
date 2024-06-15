// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import "../src/assets/movie.css"

ReactDOM.render(
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
