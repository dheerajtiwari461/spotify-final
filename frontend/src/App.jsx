import { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './Context';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';

function App() {
  const { token } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearch = async () => {
    // Implementation will be in Home.jsx
  };

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/"
        element={token ? (
          <Home
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            filter={filter}
            setFilter={setFilter}
          />
        ) : (
          <Navigate to="/signup" />
        )}
      />
    </Routes>
  );
}

App.displayName = 'App';

const AppWithContext = () => <App />;
AppWithContext.displayName = 'AppWithContext';

const AppWrapper = () => (
  <AuthProvider>
    <AppWithContext />
  </AuthProvider>
);
AppWrapper.displayName = 'AppWrapper';

export default AppWrapper;
