import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './components/AuthContext';
import LoginForm from './components/Login';
import LogoutForm from './components/Logout';
import SignUpForm from './components/Register';
import StudentForm from './components/StudentsForm';
import EditingComponent from './components/EditingForm';
import HomePage from './components/Homepage';
import Results from './components/Results';
import ResultPage from './components/ResultsPage';
import Graph from './components/dashboard';
import StudentDashboard from './components/StudentDashboard';
import SubjectDashboard from './components/SubjectDashboard';
import EmailForm from './components/EmailForm';
import StudentDropdown from './components/StudentDropdown';




function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/studentsform" element={<StudentForm />} />
          <Route path="/EditingForm" element={<EditingComponent/>}/>
          <Route path="/Results" element={<Results/>}/>
          <Route path="/viewresults/:hallTicketNo" element={<ResultPage />} />
          <Route path="/logout" element={<LogoutForm />} />
          <Route path="/students" element={<StudentDashboard/>} /> 
          <Route path="/subjects" element={<SubjectDashboard />} /> 
          <Route path="/Graph" element={<Graph/>}/>
          <Route path="/Email" element={<EmailForm/>}/>
          <Route path="/selectstudent" element={<StudentDropdown/>}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
