import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../src/styles/Login.css';



const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signin', { email: username, password });
      login();
      setUsername('');
      setPassword('');
      setError('');
      navigate("/memberlist");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password.');
      } else if (error.response && error.response.status === 409) {
        setError('Email already exists.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container">
      <div className="center">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Email"
            autocomplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <input type="submit" value="Login" />
        </form>
        <br />
        <hr />
        <h4 style={{ paddingLeft: 140 }}>or</h4>
        {/* <GoogleLoginComponent onSuccess={(userData) => console.log(userData)} /> */}
        <div className="register">
          <p>Don't have an account? <br /><a href="/signup">Create Account</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
