import React, { useEffect, useState } from "react";
import { searchAlbumsByArtist } from "../../utils/SpotifyApi";
import { fetchSpotifyToken } from "../../utils/auth";
import { loginWithGoogle, logout, onAuthChange } from "../../utils/FirebaseApi";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from "../ImagePopup/ImagePopup";
import AboutPopup from "../About/AboutPopup";
import Preloader from "../Preloader/Preloader";

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
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  const handleSubmit = async (event) => {
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
  }

  function closeAllPopups() {
    setIsImagePopupOpen(false);
    setIsAboutPopupOpen(false);
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

  const handleAboutClick = () => {
    setIsAboutPopupOpen(true);
  };

  return (
    <div className="App">
      <Header handleGoogleLogout={handleGoogleLogout} />
      {!currentUser.uid && <Home handleGoogleLogin={handleGoogleLogin} />}

      {currentUser.uid && (
        <div>
          <Navigation
            currentUser={currentUser}
            handleGoogleLogout={handleGoogleLogout}
            handleSubmit={handleSubmit}
            searchInput={searchInput}
            handleChange={handleChange}
          />
          <section className="preloader__container">
            {isPreloading ? <Preloader /> : ""}
          </section>
          <Main
            albums={albums}
            visibleCount={visibleCount}
            handleLoadMore={handleLoadMore}
            handleImageClick={handleImageClick}
          />
        </div>
      )}
      <Footer
        onGitHubClick={handleGitHubClick}
        onLinkedinClick={handleLinkedinClick}
        onInstagramClick={handleInstagramClick}
        onAboutClick={handleAboutClick}
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        link={selectedCardPicture}
        name={selectedCardName}
        onClose={closeAllPopups}
      />
      <AboutPopup isOpen={isAboutPopupOpen} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
