import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './components/AuthContext';
import LoginForm from './components/Login';
import LogoutForm from './components/Logout';
import SignUpForm from './components/Register';
import StudentForm from './components/StudentsForm';
import HomePage from './components/Homepage';
import Results from './components/Results';
import ViewResults from './components/ViewResults';
import ResultPage from './components/ResultsPage';


function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/studentsform" element={<StudentForm />} />
          <Route path="/viewresults" element={<ViewResults />} />
          <Route path="/Results" element={<Results/>}/>
          <Route path="/Resultspage/:hallTicketNo" element={<ResultPage/>} />
          <Route path="/logout" element={<LogoutForm />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
