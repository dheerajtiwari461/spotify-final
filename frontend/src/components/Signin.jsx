/**
 * This component renders a form for signing in to the application.
 * It calls the '/signin' API endpoint with the user's email and password.
 * If the API responds with a valid token, it logs the user in and redirects
 * them to the home page. If the API responds with an error, it displays an
 * error message to the user.
 */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context';
import './common.css';   

/**
 * The Signin component contains three pieces of state: an email, a password,
 * and an error message. The email and password are used to call the '/signin'
 * API endpoint, and the error message is set if the API responds with an
 * error.
 */
function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);  // login ki jagah setToken use karenge

  /**
   * The handleSubmit function is called when the user submits the form. It
   * calls the '/signin' API endpoint with the user's email and password, and
   * logs the user in if the API responds with a valid token.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      /**
       * The '/signin' API endpoint is called with the user's email and
       * password. If the API responds with a valid token, it is stored in
       * the component's state.
       */
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        /**
         * If the API responds with an error, the error message is set to
         * the error message from the API response.
         */
        throw new Error('Sign-in failed');
      }

      const { token } = await response.json();
      /**
       * If the API responds with a valid token, the user is logged in and
       * redirected to the home page.
       */
      setToken(token);  // login ki jagah setToken use karenge
      navigate('/');
    } catch (error) {
      /**
       * If an error occurs when calling the API, the error message is set
       * to the error message from the error.
       */
      setError(error.message);
    }
  };

  /**
   * The handleSignupRedirect function is called when the user clicks the
   * "Don't have an account? Sign Up" button. It redirects the user to the
   * signup page.
   */
  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Sign In</button>
      </form>
      <button className="signin-redirect-button" onClick={handleSignupRedirect}>
        Don't have an account? Sign Up
      </button>
    </div>
  );
}

export default Signin;

