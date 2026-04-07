import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddVehicleForm from './AddVehicleForm';

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
              {vehicles.map((vehicle, index) => (
                <Col sm={6} key={index}>
                  <Card className="shadow-sm border-0 h-100">
                    <Card.Body>
                      <Card.Title style={{ color: 'var(--rs-dark-gray)' }}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        Manage maintenance and modifications for this vehicle.
                      </Card.Text>
                      <Button 
                        as={Link} 
                        to={`/vehicles/${vehicle.id}`} 
                        className="btn-custom-outline rounded-pill px-3 py-1 mt-2"
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}