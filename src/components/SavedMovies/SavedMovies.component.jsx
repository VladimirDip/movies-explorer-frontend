import { useContext, useEffect, useState } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList.component';
import SearchForm from '../SearchForm/SearchForm.component';
import Preloader from '../Preloader/Preloader.component';
import ErrorMessage from '../ErrorMessage/ErrorMessage.component';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { filterMoviesSearch, filterShortMovies } from '../../utils/utilities';
import { ERROR_MESSAGES } from '../../utils/constants';

import './SavedMovies.styles.css';

const SavedMovies = ({ userMovieList, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState({
    isShown: false,
    message: '',
  });

  const [localMovieList, setLocalMovieList] = useState(userMovieList);
  const [filtredMovieList, setFiltredMovieList] = useState(localMovieList);

  const currentUser = useContext(CurrentUserContext);

  // Search submit from user request
  const handleSearchSubmit = (inputValue) => {
    setIsErrorMessage({ isShown: false, message: '' });
    setIsLoading(true);
    localStorage.setItem(`${currentUser.email} - movieLocalSearch`, inputValue);

    const moviesToRender = filterMoviesSearch(
      userMovieList,
      inputValue,
      isShortMovies,
    );

    if (moviesToRender.length === 0) {
      setIsErrorMessage({ isShown: true, message: ERROR_MESSAGES.NOT_FOUND });
    } else {
      setIsErrorMessage({ isShown: false, ErrorMessage: '' });
      setFiltredMovieList(moviesToRender);
      setLocalMovieList(moviesToRender);
      localStorage.setItem(
        `${currentUser.email} - savedSearchMovies`,
        JSON.stringify(moviesToRender),
      );
      if (isShortMovies) {
        const localMovies = JSON.parse(
          localStorage.getItem(`${currentUser.email} - savedSearchMovies`),
        );
        setLocalMovieList(filterShortMovies(localMovies));
      }
    }
    setIsLoading(false);
  };

  const handleShortMoviesCheckbox = () => {
    if (!isShortMovies) {
      setIsShortMovies(true);
      setLocalMovieList(filterShortMovies(filtredMovieList));
      filterShortMovies(filtredMovieList).length === 0
        ? setIsErrorMessage({
            isShown: true,
            message: ERROR_MESSAGES.NOT_FOUND,
          })
        : setIsErrorMessage({
            isShown: false,
            message: '',
          });
      localStorage.setItem(
        `${currentUser.email} - isShortBookmarkedMovies`,
        true,
      );
    } else {
      setIsShortMovies(false);
      setLocalMovieList(filtredMovieList);
      filtredMovieList.length === 0
        ? setIsErrorMessage({
            isShown: true,
            message: ERROR_MESSAGES.NOT_FOUND,
          })
        : setIsErrorMessage({
            isShown: false,
            message: '',
          });
      localStorage.setItem(
        `${currentUser.email} - isShortBookmarkedMovies`,
        false,
      );
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - isShortBookmarkedMovies`) ===
      'true'
    ) {
      setIsShortMovies(true);
      setLocalMovieList(filterShortMovies(userMovieList));
      setFiltredMovieList(userMovieList);
    } else {
      setIsShortMovies(false);
      setLocalMovieList(userMovieList);
      setFiltredMovieList(userMovieList);
    }
    userMovieList.length === 0
      ? setIsErrorMessage({
          isShown: true,
          message: ERROR_MESSAGES.NOT_FOUND,
        })
      : setIsErrorMessage({
          isShown: false,
          message: '',
        });
  }, [currentUser, userMovieList]);

  useEffect(() => {
    if (
      localStorage.getItem(`${currentUser.email} - movieLocalSearch`) &&
      localStorage.getItem(`${currentUser.email} - isShortBookmarkedMovies`) ===
        'true' &&
      localStorage.getItem(`${currentUser.email} - movieLocalSearch`)
    ) {
      const qui = localStorage.getItem(
        `${currentUser.email} - movieLocalSearch`,
      );

      const moviesToRender = filterMoviesSearch(
        userMovieList,
        qui,
        isShortMovies,
      );

      setIsShortMovies(true);
      setLocalMovieList(filterShortMovies(moviesToRender));
      setFiltredMovieList(moviesToRender);
    }
  }, [currentUser, userMovieList]);

  return (
    <main className="movies">
      <SearchForm
        isShortMovies={isShortMovies}
        onSearch={handleSearchSubmit}
        onFilterCheckbox={handleShortMoviesCheckbox}
      />
      {isLoading ? (
        <Preloader />
      ) : !isErrorMessage.isShown ? (
        <MoviesCardList
          filtredMovieList={localMovieList}
          userMovieList={userMovieList}
          onDelete={onDelete}
          isShortMovies={isShortMovies}
        />
      ) : (
        <ErrorMessage message={isErrorMessage.message} />
      )}
    </main>
  );
};
export default SavedMovies;
