import React from "react";
import homepage__picture from "../images/homepage__body-picture.jpeg";

function Home({ handleGoogleLogin }) {
  return (
    <div className="Homepage__container">
      <div className="Homepage__body">
        <div className="Homepage__body-description">
          <p className="Homepage__body-project">
            This WEB site has been developed as the Final Project (Type 1 –
            Frontend connected to an external API) of the Full-stack WEB
            Developer bootcamp, by TripleTen.
          </p>
          <p className="Homepage__body-project">
            The site has been built using React + Vite. The application is
            deployed using Firebase with Google authentication; and connected to
            the Spotify API. All the project is accessible via GitHub.
          </p>
          <p className="Homepage__body-project">
            Any feedback is greatly appreciated and can be sent via the contact
            channels (Github/LinkedIn).
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
  );
}

export default Home;
