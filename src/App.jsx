// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const CLIENT_ID = "cc4c47d7b9e44cf6a3030dde3ffeba1c";
const CLIENT_SECRET = "0f685ecf082f4ccd8eb4f221c74de910";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RESPONSE_TYPE = "token";

function App() {
  const [token, setToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
  return (
    <div className="App">
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
  );
}

export default App;
