import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.styles.css';
import { Link } from 'react-router-dom';

const Profile = ({ onSignOut }) => {
  const [values, setValues] = useState({});
  const currentUser = useContext(CurrentUserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  return (
    <main className="profile">
      <h1 className="profile__title">{`Привет, ${values.name ?? ''}!`}</h1>
      <form // TODO onSubmit
        className="profile__form"
        name="profile"
      >
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              className="profile__input"
              name="name"
              type="text"
              value={values.name ?? ''}
              required
              onChange={handleChange}
              placeholder="Имя"
            />
          </label>
          {/* TODO Errors */}
          <span className="profile__input-error profile__input-error_name">
            Здесь будет текст ошибки имени
          </span>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              className="profile__input"
              name="email"
              type="email"
              value={values.email ?? ''}
              required
              onChange={handleChange}
              placeholder="E - mail"
            />
          </label>
          {/* TODO Errors */}
          <span className="profile__input-error profile__input-error_email">
            Здесь будет текст ошибки емайл
          </span>
        </div>
      </form>
      <div className="profile__buttons-container">
        <button type="submit" className="profile__button-edit">
          Редактировать
        </button>
        <button // TODO onClick refactoring for logic
          type="submit"
          className="profile__button-exit"
        >
          <Link to={'/'} className="profile__buttons-link" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        </button>
      </div>
    </main>
  );
};

export default Profile;
