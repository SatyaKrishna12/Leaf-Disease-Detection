// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './assets/scss/styles.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Result from './pages/Result';
import AllPredictions from './pages/AllPredictions';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import FeedbackForm from './pages/FeedbackForm';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
    {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/predict" element={<ProtectedRoute><Predict /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute><FeedbackForm /></ProtectedRoute>} />
        <Route path="/all-predictions" element={<ProtectedRoute><AllPredictions /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
