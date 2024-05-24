import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signin" element={<LoginForm />} />
            {/* <Route path="/signup" element={<SignUpForm />} /> */}
            {/* <Route path="/logout" element={<LogoutForm />} /> */}
        </Routes>
        </Router>
    </>
  )
}

export default App
