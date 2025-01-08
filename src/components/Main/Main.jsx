import React from "react";

function Main({ albums, visibleCount, handleLoadMore, handleImageClick }) {
  const visibleAlbums = albums.slice(0, visibleCount);
  return (
    <section className="elements" id="elements">
      {visibleAlbums.map((album, i) => (
        <div key={i} className="template__element">
          <div className="element__image-container">
            <img
              src={album.images[0].url}
              alt={`${album.name}, (${album.release_date})`}
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
      ))}

      {visibleCount < albums.length && (
        <div className="element__button-container">
          <button onClick={handleLoadMore} className="element__button">
            Show More...
          </button>
        </div>
      )}
    </section>
  );
}

export default Main;
