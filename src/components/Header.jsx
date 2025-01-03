import React, { useEffect, useState } from "react";
import header__logo from "../images/header__logo.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function Header({ handleGoogleLogout }) {
  const auth = getAuth();
  const [thisUser, setThisUser] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setThisUser(user);
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

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

        {thisUser && (
          <button onClick={handleGoogleLogout}>Cerrar Sesión</button>
        )}
      </div>
    </header>
  );
}
