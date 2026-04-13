import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home'; 
import Vehicles from './pages/Vehicles'; 
import VehicleView from './pages/VehicleView'; 
import Footer from './components/Footer';
import About from './pages/About';
import './App.css';

export default function App() {
  return (
    <div className="bg-app-light text-dark d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}