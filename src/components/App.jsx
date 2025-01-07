import React, { useEffect, useState } from "react";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import homepage__picture from "../images/homepage__body-picture.jpeg";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Preloader from "./Preloader";
//import * as dotenv from "dotenv";
//dotenv.config(path);
//console.log(process.env);
const CLIENT_ID = "cc4c47d7b9e44cf6a3030dde3ffeba1c";
const CLIENT_SECRET = "0f685ecf082f4ccd8eb4f221c74de910";
// const REDIRECT_URI = "http://localhost:3000";
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
// const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
// const RESPONSE_TYPE = "token";
const firebaseConfig = {
  apiKey: "AIzaSyC3UdBdWqiwNUb8KWyQXecunC0hEpPJnwA",
  authDomain: "spotify-project-ebr.firebaseapp.com",
  projectId: "spotify-project-ebr",
  storageBucket: "spotify-project-ebr.firebasestorage.app",
  messagingSenderId: "64015018840",
  appId: "1:64015018840:web:1f4316adf5c2ba4688d32d",
  measurementId: "G-FW7P3Q1T8H",
};
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [isPreloading, setIsPreloading] = React.useState(false);
  // const [token, setToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  // const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [visibleCount, setVisibleCount] = React.useState(3);
  const [searchInput, setSearchInput] = useState("");
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

  const [selectedCardName, setSelectedCardName] = React.useState("");
  const [selectedCardPicture, setSelectedCardPicture] = React.useState("");
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

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

  useEffect(() => {
    const authParam = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParam)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function handleSearch() {
    console.log("searching for " + searchInput);
    setIsPreloading(true);
    const artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    )
      .then((response) => response.json())
      .then((data) => {
        setIsPreloading(false);
        return data.artists.items[0].id;
      })
      .catch(function (e) {
        console.log("error is" + e);
      });

    if (artistID !== undefined) {
      console.log("Artis ID is" + artistID);
      const returnedAlbums = await fetch(
        "https://api.spotify.com/v1/artists/" +
          artistID +
          "/albums" +
          "?include_groups=album&market=ES&limit=15",
        artistParams
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAlbums(data.items);
        });
    } else {
      console.log("Artis not found, Dummy ID is" + "5aMPb0lNHL7cQe6oICdcTt");
    }
  }
  //console.log(albums);

  const handleGoogleLogin = () => {
    const auth = getAuth();

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            //console.log(user);
            setCurrentUser(user);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(error);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    //persistance
    return {
      handleGoogleLogin,
      currentUser,
    };
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentState) => {
      if (currentState !== null) {
        setCurrentUser(currentState);
      } else {
      }
    });
  }, []);

  const handleGoogleLogout = () => {
    //console.log(currentUser);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentUser({});
        setUser({});
        setAlbums([]);
        // console.log(currentUser);
      })
      .catch((error) => {
        // An error happened.
      });
  };

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
