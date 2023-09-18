import avatarPicture from '../../images/avatar-picture.jpg';

import './AboutMe.styles.css';

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Владимир</h3>
            <p className="about-me__age">Фронтенд-разработчик, 29 лет</p>
            <p className="about-me__text">
              Родился на востоке страны в маленьком городе Находка. После
              окончания школы переехал во Владивосток. Закончил МГУ им. адм.
              Невельского. И уже как 10 лет живу тут.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  className="about-me__social-link"
                  href="https://github.com/VladimirDip"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={avatarPicture}
            alt="Пирогов Марк"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
