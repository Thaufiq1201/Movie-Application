import React from 'react';
import { CSSTransition } from 'react-transition-group';

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <CSSTransition classNames="fade" timeout={300}>
      <div className="movie-card">
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </CSSTransition>
  );
};

export default MovieCard;
