import { SHORT_MOVIE_DURATION } from './constants';

// Convert  minutes to full hours and minutes
export const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours === 0) return `${padTo2Digits(minutes)}м`;
  if (minutes === 0) return `${hours}ч`;

  return `${hours}ч ${padTo2Digits(minutes)}м`;
};

// Pad to two digits number
export const padTo2Digits = (num) => num.toString().padStart(2, '0');

// Filter movies by "short movies" duration
export const filterShortMovies = (moviesArr) =>
  moviesArr.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);

// Filter movies by user search
export const filterMoviesSearch = (
  moviesArr,
  searchQuery,
  isShortMoviesCheckbox,
) => {
  const filtredMoviesArr = moviesArr.filter((movie) => {
    return (
      String(movie.nameRU)
        .toLowerCase()
        .trim()
        .indexOf(searchQuery.toLowerCase().trim()) !== -1 ||
      String(movie.nameEN)
        .toLowerCase()
        .trim()
        .indexOf(searchQuery.toLowerCase().trim()) !== -1
    );
  });

  // return isShortMoviesCheckbox
  //   ? filterShortMovies(filtredMoviesArr)
  //   : filtredMoviesArr;
  return filtredMoviesArr;
};

export const findBookmarkedMovies = (userMoviesArr, movie) =>
  userMoviesArr.find((item) => item.movieId === movie.id);

export const transformMoviesData = (moviesArr) => {
  moviesArr.forEach((movie) => {
    if (!movie.nameEN) movie.nameEN = movie.nameRU;
    if (!movie.country) movie.country = 'Russia';
    if (
      !movie.trailerLink ||
      !movie.trailerLink.includes('https://www.youtube.com/')
    )
      movie.trailerLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    if (!movie.image) {
      movie.image =
        'https://cs8.pikabu.ru/post_img/big/2016/03/27/7/1459078271127742859.jpg';
      movie.thumbnail =
        'https://cs8.pikabu.ru/post_img/big/2016/03/27/7/1459078271127742859.jpg';
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    }
  });
  return moviesArr;
};
