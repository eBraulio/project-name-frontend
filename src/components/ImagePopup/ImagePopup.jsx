import React, { useEffect, useRef } from "react";

export default function ImagePopup({ link, name, onClose, isOpen }) {
  useEffect(() => {
    // Manejador para la tecla Escape
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Añadir event listener para la tecla Escape
    document.addEventListener("keydown", handleEscClose);

    // Limpieza del event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  return (
    <div className={`popup  ${isOpen ? "popup__opened" : ""}`} id="image-popup">
      <div
        className={`popup__overlay ${isOpen ? "popup__overlay-opened" : ""}`}
        id="popup-overlay-image"
        onClick={onClose}
      ></div>
      <div className="popup__content-image">
        <button
          className="popup__close-button popup__close-image"
          onClick={onClose}
        ></button>
        <img
          className="popup__element-image"
          src={link || ""}
          alt={name || "."}
        />
        <p className="popup__element-title">{name || "."}</p>
      </div>
    </div>
  );
}
