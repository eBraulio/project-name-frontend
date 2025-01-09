import linkedin__logo from "../../images/linkedin_640.png";
import instagram__logo from "../../images/instagram_640.png";
import github__logo from "../../images/github__640.png";

export default function Footer({
  onGitHubClick,
  onLinkedinClick,
  onInstagramClick,
  onAboutClick,
}) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__copyright">&#169;2025 - Braulio Bañuelos</h2>
        <button onClick={onAboutClick} className="element__button-about">
          About author
        </button>
      </div>
      <div className="footer__social">
        <h2 className="footer__social-heading">Author Contact</h2>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a className="footer__social-link" onClick={onGitHubClick}>
              <img
                src={github__logo}
                alt="github icon"
                className="footer__social-icon"
              />
              GitHub
            </a>
          </li>
          <li className="footer__list-item">
            <a className="footer__social-link" onClick={onLinkedinClick}>
              <img
                src={linkedin__logo}
                alt="LinkedIn icon"
                className="footer__social-icon"
              />
              LinkedIn
            </a>
          </li>
          <li className="footer__list-item">
            <a className="footer__social-link" onClick={onInstagramClick}>
              <img
                src={instagram__logo}
                alt="instagram icon"
                className="footer__social-icon"
              />
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
