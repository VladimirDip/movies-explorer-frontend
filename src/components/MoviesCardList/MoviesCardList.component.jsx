import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard.component';

import './MoviesCardList.styles.css';

const MoviesCardList = ({ movieList }) => {
  const [loadMore, setLoadMore] = useState(false);
  const currentLocation = useLocation();
  const { movies } = movieList;

  const handleClick = () => {
    setLoadMore(true);
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies?.slice(0, 12).map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}

        {loadMore &&
          movies
            ?.slice(12)
            .map((movie) => <MoviesCard key={movie.id} movie={movie} />)}
      </ul>
      {currentLocation.pathname === '/movies' && movies.length >= 12 && (
        <button className="movies-card-list__load-more" onClick={handleClick}>
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
