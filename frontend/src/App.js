// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Start from './components/Start'; // Import the Start component
import Market from './components/Market';
import Details from './components/Details';
import Feedback from './components/Feedback';
import Reviews from './components/Reviews';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} /> {/* This will be the starting page */}
        <Route path="/home" element={<Home />} /> {/* Updated route for Home */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/market" element={<Market />} />
        <Route path="/details" element={<Details />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/reviews" element={<Reviews />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
