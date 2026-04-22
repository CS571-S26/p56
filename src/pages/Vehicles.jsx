import { useState, useEffect } from 'react';
import { Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import AddVehicleForm from '../components/AddVehicleForm';
import VehicleCard from '../components/VehicleCard'; 
// Import the search component
import VehicleSearch from '../components/VehicleSearch';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('garage-vehicles');
    if (saved) {
      return JSON.parse(saved);
    }
    return []; 
  });

  // State to track the user's search query
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('garage-vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const handleAddVehicle = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
    setShowToast(true);
  };

  // Filter the vehicles list based on the search query
  // We convert everything to lowercase so the search isn't case-sensitive
  const filteredVehicles = vehicles.filter((v) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      v.make.toLowerCase().includes(searchStr) ||
      v.model.toLowerCase().includes(searchStr) ||
      v.year.toString().includes(searchStr)
    );
  });

  return (
    <Container className="py-5 position-relative">
      <h1 className="mb-4 fw-bold fs-2" style={{ color: 'var(--rs-dark-gray)' }}>
        My Vehicles
      </h1>
      
      {/* Render the Search Bar */}
      <Row>
        <Col md={8} className="offset-md-4">
          <VehicleSearch value={searchQuery} onChange={setSearchQuery} />
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <AddVehicleForm onAdd={handleAddVehicle} />
        </Col>

        <Col md={8}>
          {/* We now check the length of filteredVehicles instead of the raw vehicles array */}
          {filteredVehicles.length === 0 ? (
            <p className="text-muted">
              {vehicles.length === 0 
                ? "No vehicles added yet. Use the form to add one." 
                : "No vehicles match your search."}
            </p>
          ) : (
            <Row className="g-3">
              {/* Map over the filtered list! */}
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </Row>
          )}
        </Col>
      </Row>

      <ToastContainer position="bottom-end" className="p-4" style={{ position: 'fixed' }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-success">Garage Tracker</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="text-white fw-semibold">
            Vehicle successfully added to your garage!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}