import landingLogo from '../../images/landing-logo.svg';
import { HashLink } from 'react-router-hash-link';
import './Promo.styles.css';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__about-project">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <HashLink
            smooth
            to="#aboutProject"
            className="promo__learn-more-link"
          >
            Узнать больше
          </HashLink>
        </div>
        <img
          src={landingLogo}
          alt="логотип Всемирная паутина"
          className="promo__logo"
        />
      </div>
    </section>
  );
};

export default Promo;
