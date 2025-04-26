import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VehiclePortal from './pages/VehiclePortal';
import StationPortal from './pages/StationPortal';
import AdminPortal from './pages/AdminPortal';
import Login from './components/Login';
import StationRegister from './pages/StationRegister';
import StationScan from './pages/StationScan';
import StationLogs from './pages/StationLogs';
import AdminStations from './pages/AdminStations';
import AdminReports from './pages/AdminReports';
import AdminVehicles from './pages/AdminVehicles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicle" element={<VehiclePortal />} />
        <Route path="/station" element={<StationPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/station/register" element={<StationRegister />} />
        <Route path="/station/scan" element={<StationScan />} />
        <Route path="/station/logs" element={<StationLogs />} />
        <Route path="/admin/vehicles" element={<AdminVehicles />} />
        <Route path="/admin/stations" element={<AdminStations />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/station/portal" element={<StationPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
