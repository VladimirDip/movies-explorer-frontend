import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { DEVICE_SCREEN_SETTINGS } from '../../utils/constants';
import { findBookmarkedMovies } from '../../utils/utilities';

import MoviesCard from '../MoviesCard/MoviesCard.component';

import './MoviesCardList.styles.css';

const MoviesCardList = ({
  filtredMovieList,
  userMovieList,
  onBookmark,
  onDelete,
  isShortMovies,
}) => {
  const { desktop, medium, tablet, phone } = DEVICE_SCREEN_SETTINGS;
  const [cardDisplayOptions, setCardDisplayOptions] = useState(desktop.cards);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const currentLocation = useLocation();

  const widthSize = useWindowWidth();

  const handleLoadMoreClick = () => {
    const start = moviesToDisplay.length;
    const end = start + cardDisplayOptions.add;
    const add = filtredMovieList.length - start;
    const newMovies = filtredMovieList?.slice(start, end);

    if (add > 0) {
      setMoviesToDisplay([...moviesToDisplay, ...newMovies]);
      setCardDisplayOptions({ ...cardDisplayOptions, total: end });
    }
  };

  useEffect(() => {
    setMoviesToDisplay(
      filtredMovieList?.filter((_, index) => index < cardDisplayOptions.total),
    );
  }, [filtredMovieList, cardDisplayOptions.total, isShortMovies]);
  // console.log(moviesToDisplay);
  useEffect(() => {
    if (currentLocation.pathname === '/movies') {
      if (widthSize >= desktop.minWidth) setCardDisplayOptions(desktop.cards);
      else if (widthSize < desktop.minWidth && widthSize >= medium.minWidth)
        setCardDisplayOptions(medium.cards);
      else if (widthSize < desktop.minWidth && widthSize >= tablet.minWidth)
        setCardDisplayOptions(tablet.cards);
      else if (widthSize < tablet.minWidth) setCardDisplayOptions(phone.cards);
    }
  }, [widthSize, desktop, tablet, phone, medium, currentLocation.pathname]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {moviesToDisplay?.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            isBookmarked={findBookmarkedMovies(userMovieList, movie)}
            onBookmark={onBookmark}
            onDelete={onDelete}
          />
        ))}
      </ul>
      {(currentLocation.pathname === '/movies' ||
        currentLocation.pathname === '/saved-movies') &&
        moviesToDisplay.length < filtredMovieList.length &&
        moviesToDisplay.length >= phone.cards.total && (
          <button
            className="movies-card-list__load-more"
            onClick={handleLoadMoreClick}
          >
            Ещё
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;
