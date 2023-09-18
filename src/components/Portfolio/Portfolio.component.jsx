import './Portfolio.styles.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__projects-list">
          <li className="portfolio__projects-item">
            <a
              className="portfolio__link"
              href="https://github.com/VladimirDip/how-to-learn"
              title="Проект - How to learn"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__projects-item">
            <a
              className="portfolio__link"
              href="https://github.com/VladimirDip/russian-travel"
              title="Проект - Russian travel"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__projects-item">
            <a
              className="portfolio__link"
              href="https://github.com/VladimirDip/react-mesto-api-full-gha"
              title="Проект - Mesto"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;
