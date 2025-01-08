import React, { useEffect, useState } from "react";
import { searchAlbumsByArtist } from "../utils/SpotifyApi";
import { fetchSpotifyToken } from "../utils/auth";
import { loginWithGoogle, logout, onAuthChange } from "../utils/FirebaseApi";
import homepage__picture from "../images/homepage__body-picture.jpeg";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Preloader from "./Preloader";

function App() {
  const [isPreloading, setIsPreloading] = React.useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCardName, setSelectedCardName] = React.useState("");
  const [selectedCardPicture, setSelectedCardPicture] = React.useState("");
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSearch(searchInput);
  };
  const handleButtonClick = (event) => {
    event.preventDefault();
    handleSearch(searchInput);
  };
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await fetchSpotifyToken();
        setAccessToken(token);
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };

    getAccessToken();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser({});
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      setCurrentUser(user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await logout();
      setCurrentUser({});
      setAlbums([]);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  function handleImageClick(album) {
    handleCardClick(album);
  }
  function handleCardClick(album) {
    setIsImagePopupOpen(true);
    setSelectedCardName(album.target.alt);
    setSelectedCardPicture(album.target.src);
    //console.log(album.target.src);
    //console.log(album.target.alt);
  }

  function closeAllPopups() {
    setIsImagePopupOpen(false);
  }

  async function handleSearch() {
    console.log("Searching for albums:", searchInput);
    setIsPreloading(true);
    try {
      const returnedAlbums = await searchAlbumsByArtist(
        searchInput,
        accessToken
      );
      setAlbums(returnedAlbums);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsPreloading(false);
    }
  }

  function handleGitHubClick() {
    window.open("https://github.com/eBraulio", "_blank");
  }

  function handleLinkedinClick() {
    window.open(
      "https://www.linkedin.com/in/braulio-banuelos-8bb9b579",
      "_blank"
    );
  }

  function handleInstagramClick() {
    window.open("https://www.instagram.com/vanbrolok", "_blank");
  }

  React.useEffect(() => {
    setVisibleCount(3);
  }, [albums]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const visibleAlbums = albums.slice(0, visibleCount);

  return (
    <div className="App">
      <Header handleGoogleLogout={handleGoogleLogout} />
      {!currentUser.uid && (
        <div className="Homepage__container">
          <div className="Homepage__body">
            <div className="Homepage__body-description">
              <p className="Homepage__body-project">
                This WEB site has been developed as the Final Project (Type 1 –
                Frontend connected to an external API) of the Full-stack WEB
                Developer bootcamp, by TripleTen.{" "}
              </p>
              <p className="Homepage__body-project">
                The site has been built using React + Vite. The application is
                deployed using Firebase with Google authentication; and
                connected to the Spotify API. All the project is accessible via
                GitHub.
              </p>
              <p className="Homepage__body-project">
                Any feedback is greatly appreciated and can be sent via the
                contact channels (Github/LinkedIn).
              </p>
              <h2 className="Homepage__body-title">Let's try it!</h2>
              <button
                onClick={handleGoogleLogin}
                className="Homepage__button-login"
              >
                Login using Google
              </button>
            </div>
            <img
              src={homepage__picture}
              alt={"homepage picture" || ""}
              className="Homepage__body-cover"
            />
          </div>
        </div>
        //
      )}
      {currentUser.uid && (
        <div>
          <section className="profile">
            <div className="profile__avatar">
              <img
                className="profile__avatar-image"
                src={currentUser.photoURL || ""}
                alt={currentUser.displayName || ""}
              />
            </div>
            <div className="profile__info">
              <div className="profile__info-container">
                <p className="profile__name">Hey, {currentUser.displayName}!</p>
                <button
                  onClick={handleGoogleLogout}
                  className="profile__logout-button"
                >
                  Logout
                </button>
              </div>
              <form className="profile__search" onSubmit={handleSubmit}>
                <input
                  required
                  type="text"
                  minLength="2"
                  maxLength="50"
                  className="profile__search-input"
                  placeholder="Type any Artist to check its Albums"
                  onChange={handleChange}
                ></input>
                <button type="submit" className="profile__search-button">
                  {" "}
                  Search!{" "}
                </button>
              </form>
            </div>
          </section>
          <section className="preloader__container">
            {isPreloading ? <Preloader /> : ""}
          </section>
          {
            <section className="elements" id="elements">
              {visibleAlbums.map((album, i) => {
                //console.log(album);
                return (
                  <div className="template__element">
                    <div className="element__image-container">
                      <img
                        src={album.images[0].url}
                        alt={album.name + "," + " (" + album.release_date + ")"}
                        className="element__image"
                        onClick={handleImageClick}
                      />
                    </div>
                    <div className="element__description">
                      <h2 className="element__text">{album.name}</h2>
                      <span className="element__release">
                        Release date: ({album.release_date})
                      </span>
                    </div>
                  </div>
                );
              })}
              {visibleCount < albums.length && (
                <div className="element__button-container">
                  <button onClick={handleLoadMore} className="element__button">
                    Show More...
                  </button>
                </div>
              )}
            </section>
          }
        </div>
      )}
      <Footer
        onGitHubClick={handleGitHubClick}
        onLinkedinClick={handleLinkedinClick}
        onInstagramClick={handleInstagramClick}
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        link={selectedCardPicture}
        name={selectedCardName}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
