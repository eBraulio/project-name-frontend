import React, { useEffect, useRef } from "react";
import imagePath from "../../images/about__picture.png";

export default function aboutPopup({ link, name, onClose, isOpen }) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  return (
    <div className={`popup  ${isOpen ? "popup__opened" : ""}`} id="image-popup">
      <div
        className={`popup__overlay ${isOpen ? "popup__overlay-opened" : ""}`}
        id="popup-overlay-about"
        onClick={onClose}
      ></div>
      <div className="popup__about-content">
        <button
          className="popup__close-button popup__close-about"
          onClick={onClose}
        ></button>
        <img className="popup__about-image" src={imagePath} alt={name || "."} />
        <p className="popup__about-text">
          This is Braulio from CDMX! I'm 36, and have been working 10 years
          non-stop as a Virtual Analysis engineer for an automotive OEM.
          <br></br>
          <br></br>
          Now that I'm about to complete the WEB Developer Bootcamp, I'm looking
          forward to start working in the Web Dev world!
          <br></br>
          <br></br>
          As a Junior full stack WEB developer, I'd like to work as a part-time
          or freelance developer, while I continue working on my current
          position; but I'm open to any posibility.
          <br></br>
          <br></br>
          Any feedback about this site is greatly appreciated.
        </p>
      </div>
    </div>
  );
}
