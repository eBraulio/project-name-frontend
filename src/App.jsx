// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const CLIENT_ID = "cc4c47d7b9e44cf6a3030dde3ffeba1c";
const CLIENT_SECRET = "0f685ecf082f4ccd8eb4f221c74de910";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RESPONSE_TYPE = "token";

import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"; //Firebase Google auth

//Copy from FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3UdBdWqiwNUb8KWyQXecunC0hEpPJnwA",
  authDomain: "spotify-project-ebr.firebaseapp.com",
  projectId: "spotify-project-ebr",
  storageBucket: "spotify-project-ebr.firebasestorage.app",
  messagingSenderId: "64015018840",
  appId: "1:64015018840:web:1f4316adf5c2ba4688d32d",
  measurementId: "G-FW7P3Q1T8H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Copy from FIREBASE

function App() {
  const [token, setToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentUser, setCurrentUser] = React.useState({});

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

  //search
  async function search() {
    console.log("searching for " + searchInput);

    //get request tusing search to get artist ID
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
        return data.artists.items[0].id;
      });

    console.log("Artis ID is" + artistID);
    //get request with artist ID grab all the albums from that artist
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
  }
  console.log(albums);

  ///////////////Login Firebase
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider(); //Firebase Google auth
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
        setCurrentUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(error);
      }); //Firebase Google auth
  };

  const handleGoogleLogout = () => {
    console.log(currentUser);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setCurrentUser({});
        console.log(currentUser);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="App">
      <div>
        {!currentUser.uid && (
          <button onClick={handleGoogleLogin}>Iniciar Sesión</button>
        )}
        {currentUser.uid && (
          <button onClick={handleGoogleLogout}>Cerrar Sesión</button>
        )}
      </div>
      {currentUser.uid && (
        <div>
          <div>
            <h1>{currentUser.displayName}</h1>
            <img
              src={currentUser.photoURL || ""}
              alt={currentUser.displayName || ""}
              className=""
            />
          </div>
          <h1>Spotify Artist Album Search</h1>
          <div className="Container">
            <form className="Form">
              <input
                placeholder="Artist"
                onKeyDown={(event) => {
                  if (event.key == "Enter") {
                    search();
                  }
                }}
                onChange={(event) => setSearchInput(event.target.value)}
              ></input>
              <button type="button" onClick={search}>
                {" "}
                Search!{" "}
              </button>
            </form>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              margin: "50 auto 70",
              rowGap: 20,
              columnGap: 18,
              maxWidth: 880,
            }}
          >
            {albums.map((album, i) => {
              console.log(album);
              return (
                <div className="template__element">
                  <div className="element__image-container">
                    <img
                      src={album.images[1].url || ""}
                      alt={album.name || ""}
                      className="element__image"
                    />
                  </div>
                  <div className="element__button">
                    <h2 className="element__text">{album.name}</h2>
                    <div className="element__container"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
