import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddVehicleForm from '../components/AddVehicleForm';
import VehicleCard from '../components/VehicleCard'; 

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('garage-vehicles');
    if (saved) {
      return JSON.parse(saved);
    }
    return []; 
  });

  useEffect(() => {
    localStorage.setItem('garage-vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const handleAddVehicle = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
  };

  return (
    <Container className="py-5">
      {/* ACCESSIBILITY FIX: Changed h2 to h1 for the main page title, added fs-2 to preserve styling */}
      <h1 className="mb-4 fw-bold fs-2" style={{ color: 'var(--rs-dark-gray)' }}>
        My Vehicles
      </h1>
      <Row>
        <Col md={4} className="mb-4">
          <AddVehicleForm onAdd={handleAddVehicle} />
        </Col>

        <Col md={8}>
          {vehicles.length === 0 ? (
            <p className="text-muted">No vehicles added yet. Use the form to add one.</p>
          ) : (
            <Row className="g-3">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}