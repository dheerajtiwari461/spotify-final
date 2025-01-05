import React from 'react';

function Navbar({ searchQuery, setSearchQuery, handleSearch, filter, setFilter }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand" href="/">
          <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
            alt="Spotify Logo" 
            height="30"
          />
        </a>
        <div className="search-container">
          <input
            type="search"
            className="form-control"
            placeholder="Search for songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">Filter by</option>
            <option value="most_viewed">Most Viewed</option>
            <option value="genre">Genre</option>
            <option value="artist">Artist</option>
          </select>
          <button className="btn btn-outline-success" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
