import React from "react";

import "../blocks/Preloader.css";

function Preloader() {
  return (
    <>
      <div className="preloader">
        <i className="preloader__circle"></i>
        <p className="preloader__text">Searching. . .</p>
      </div>
    </>
  );
}

export default Preloader;
