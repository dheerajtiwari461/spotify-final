import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './common.css';

/**
 * The Signup component renders a form for signing up to the application.
 * It calls the '/signup' API endpoint with the user's email and password.
 * If the API responds with a valid token, it logs the user in and redirects
 * them to the home page. If the API responds with an error, it displays an
 * error message to the user.
 */
function Signup() {
  /**
   * The component's state is initialized with empty strings for email and
   * password, and an empty string for the error message.
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * The navigate function is used to programmatically change the current
   * route. It is obtained from the useNavigate hook from react-router-dom.
   */
  const navigate = useNavigate();

  /**
   * The handleSubmit function is called when the user submits the form. It
   * calls the '/signup' API endpoint with the user's email and password, and
   * logs the user in if the API responds with a valid token.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      /**
       * The '/signup' API endpoint is called with the user's email and
       * password. If the API responds with a valid token, it is stored in
       * the component's state.
       */
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        /**
         * If the API responds with a valid token, the user is logged in and
         * redirected to the home page.
         */
        navigate('/signin');
      } else {
        /**
         * If the API responds with an error, the error message is set to
         * the error message from the API response.
         */
        const errorData = await response.json();
        setError(errorData.message || 'Sign-up failed');
      }
    } catch (error) {
      /**
       * If an error occurs when calling the API, the error message is set
       * to the error message from the error.
       */
      setError('Network error. Please try again.');
    }
  };
  /**
   * The handleSigninRedirect function is called when the user decides to
   * navigate to the sign-in page. It uses the `navigate` function from
   * react-router-dom to programmatically change the current route to
   * '/signin'.
   */
  const handleSigninRedirect = () => {
    navigate('/signin'); // Redirects the user to the sign-in page
  };
  return (
    <div className="signup-container">
     
      <h2 className="signup-title">Create Your Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <button className="signin-redirect-button" onClick={handleSigninRedirect}>
        Already have an account? Sign In
      </button>
    </div>
  );
}


export default Signup;
