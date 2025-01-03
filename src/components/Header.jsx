import header__logo from "../images/header__logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img src={header__logo} alt={"logo" || ""} className="header__logo" />
        <div className="header__title-container">
          <h1 className="header__title">
            Find your Favorite Artist's Discography
          </h1>
          <span className="header__title">at Spotify!</span>
        </div>
      </div>
    </header>
  );
}
