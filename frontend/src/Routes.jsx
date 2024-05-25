import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import SignUpForm from './components/Register';
import StudentForm from './components/StudentsForm';
import MainLayout from './components/MainLayout';
import HomePage from './components/Homepage';
import ViewResults from './components/ViewResults';
import ResultPage from "./components/ResultsPage";





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
           <Route path="/login" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<MainLayout />}/> 
           <Route path="/Homepage" element={<HomePage />} />
          <Route path="/Studentsform" element={<StudentForm/>}/>
          <Route path="/ViewResults" element={<ViewResults />} /> 
          <Route path="/" element={<ResultPage/>} />
          {/* <Route path="/logout" element={<LogoutForm />} /> */}
      </Routes>
      </Router>
    </>
  )
}

export default App
