import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VehiclePortal from './pages/VehiclePortal';
import StationPortal from './pages/StationPortal';
import AdminPortal from './pages/AdminPortal';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicle" element={<VehiclePortal />} />
        <Route path="/station" element={<StationPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
