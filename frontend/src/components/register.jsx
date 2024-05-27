import React, { useState } from 'react';
import axios from 'axios';
import '../../src/styles/Register.css'; // Corrected import statement
import { useNavigate } from 'react-router-dom';


function SignUpForm({ redirectToSignIn }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSignUp = async () => {
    // Check if any required fields are empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        firstName,
        lastName,
        email,
        password
      });
      setSuccessMessage('Sign up successful! Please sign in.');
      setError('');
      // Redirect to sign-in after a short delay
      setTimeout(() => {
        navigate("/login") // Call navigate function after successful sign-up
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === 'Email already exists') {
        setError('Email already exists. Please use a different email.');
      } else {
        setError('Error signing up. Please try again.');
        console.error(error);
      }
    }
  };
  

  return (
    <div className='container'>
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <input type="text" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="email" id="email" placeholder="Email"  autocomplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" id="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" id="confirmPassword" placeholder="Re-enter Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button className='login-button' onClick={handleSignUp}>Sign Up</button>
    </div>
  </div>
);
}

export default SignUpForm;
