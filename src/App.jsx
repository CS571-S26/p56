import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home'; 
import Vehicles from './Vehicles'; 
import VehicleView from './VehicleView'; // Import the new component
import './App.css';

export default function App() {
  return (
    <div className="bg-app-light text-dark" style={{ minHeight: '100vh' }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        {/* The :id parameter captures the unique vehicle ID from the URL */}
        <Route path="/vehicles/:id" element={<VehicleView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}