import { useState, useEffect } from 'react';
import '../styles/home.css';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio, setAudio] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:5000/songs');
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handlePlay = (track) => {
    if (audio) {
      audio.pause();
    }
    if (currentTrack?._id === track._id && isPlaying) {
      setIsPlaying(false);
    } else {
      const newAudio = new Audio(`http://localhost:5000${track.url}`);
      setAudio(newAudio);
      setCurrentTrack(track);
      setIsPlaying(true);
      newAudio.play();
    }
  };

  const handleLike = (track) => {
    setLikes(prev => ({
      ...prev,
      [track._id]: !prev[track._id]
    }));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);
    
    if (searchTerm === '') {
      fetchSongs();
    } else {
      const filteredResults = searchResults.filter(track => 
        track.songname.toLowerCase().includes(searchTerm) ||
        track.singer.toLowerCase().includes(searchTerm)
      );
      setSearchResults(filteredResults);
    }
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  return (
    <div className="spotify-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search songs or artists..."
          value={searchInput}
          onChange={handleSearch}
          className="search-input"
        />
      </div>      
      <div className="results-section">
        {searchResults.length === 0 ? (
          <p>No songs found</p>
        ) : (
          searchResults.map(track => (
            <div key={track._id} className="track-card">
              <div className="track-image-container">
                <img 
                  src={`http://localhost:5000${track.image}`} 
                  alt={track.songname} 
                />
                <button 
                  className={`play-pause-btn ${currentTrack?._id === track._id ? 'playing' : ''}`}
                  onClick={() => handlePlay(track)}
                >
                  {currentTrack?._id === track._id && isPlaying ? '⏸️' : '▶️'}
                </button>
              </div>
              <h3>{track.songname}</h3>
              <p>{track.singer}</p>
              <button 
                onClick={() => handleLike(track)} 
                className={`like-btn ${likes[track._id] ? 'liked' : ''}`}
              >
                {likes[track._id] ? 'Unlike' : 'Like'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;