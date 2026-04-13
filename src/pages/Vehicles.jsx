import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddVehicleForm from '../components/AddVehicleForm';
import VehicleCard from '../components/VehicleCard'; // 1. Import the new component

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
      <h2 className="mb-4 fw-bold" style={{ color: 'var(--rs-dark-gray)' }}>
        My Vehicles
      </h2>
      <Row>
        <Col md={4} className="mb-4">
          <AddVehicleForm onAdd={handleAddVehicle} />
        </Col>

        <Col md={8}>
          {vehicles.length === 0 ? (
            <p className="text-muted">No vehicles added yet. Use the form to add one.</p>
          ) : (
            <Row className="g-3">
              {/* 2. Meaningfully use the component by passing the vehicle as a prop */}
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