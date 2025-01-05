import linkedin__logo from "../images/linkedin_640.png";
import instagram__logo from "../images/instagram_640.png";

export default function Footer() {
  // function NewTab(url) {
  //   window.open(url, "_blank");
  // }
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__copyright">&#169;2025 - Braulio Bañuelos</h2>
        <div className="footer__social">
          <h2 className="footer__social-heading">Author Contact</h2>
          <ul className="footer__list">
            <li className="footer__list-item">
              <a
                href="https://www.linkedin.com/in/braulio-banuelos-8bb9b579"
                className="footer__social-link"
              >
                <img
                  src={linkedin__logo}
                  alt="facebook icon"
                  className="footer__social-icon"
                />
                LinkedIn
              </a>
            </li>
            <li className="footer__list-item">
              <a
                className="footer__social-link"
                href="https://www.instagram.com/vanbrolok"
                //onclick={NewTab("https://www.instagram.com/vanbrolok")}
              >
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
      </div>
    </footer>
  );
}
