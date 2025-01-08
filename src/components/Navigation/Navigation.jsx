import React from "react";

function Navigation({
  currentUser,
  handleGoogleLogout,
  handleSubmit,
  searchInput,
  handleChange,
}) {
  return (
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
            value={searchInput}
            onChange={handleChange}
          />
          <button type="submit" className="profile__search-button">
            Search!
          </button>
        </form>
      </div>
    </section>
  );
}

export default Navigation;
