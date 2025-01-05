import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('spotifyToken') || '');

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('spotifyToken', newToken);
    } else {
      localStorage.removeItem('spotifyToken');
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// MusicContext for handling music-related state
export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultOffset, setResultOffset] = useState(0);

  return (
    <MusicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        resultOffset,
        setResultOffset,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

// Combined ContextProvider to wrap the whole app
export const CombinedProvider = ({ children }) => {
  return (
    <AuthProvider>
      <MusicProvider>
        {children}
      </MusicProvider>
    </AuthProvider>
  );
};