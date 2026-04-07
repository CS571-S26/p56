import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default function VehicleView() {
  const { id } = useParams();
  
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  
  // Get today's date in YYYY-MM-DD format for the HTML date input default
  const today = new Date().toISOString().split('T')[0];
  
  const [recordType, setRecordType] = useState('maintenance');
  const [recordDate, setRecordDate] = useState(today); // New state for date
  const [recordText, setRecordText] = useState('');
  const [recordMileage, setRecordMileage] = useState(''); 

  useEffect(() => {
    const saved = localStorage.getItem('garage-vehicles');
    if (saved) {
      const parsedVehicles = JSON.parse(saved);
      setVehicles(parsedVehicles);
      
      const foundVehicle = parsedVehicles.find(v => v.id === id);
      setVehicle(foundVehicle);
    }
  }, [id]);

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!recordText || !recordDate) return;

    const newRecord = {
      id: Date.now().toString(),
      date: recordDate, // Save the user-selected date
      description: recordText,
      mileage: recordMileage 
    };

    const updatedVehicle = { ...vehicle };
    updatedVehicle[recordType] = [...updatedVehicle[recordType], newRecord];

    const updatedVehicles = vehicles.map(v => v.id === id ? updatedVehicle : v);
    
    setVehicles(updatedVehicles);
    setVehicle(updatedVehicle);
    localStorage.setItem('garage-vehicles', JSON.stringify(updatedVehicles));
    
    // Clear inputs and reset date to today
    setRecordText('');
    setRecordMileage(''); 
    setRecordDate(today);
  };

  if (!vehicle) {
    return (
      <Container className="py-5 text-center">
        <h3>Vehicle not found.</h3>
        <Button as={Link} to="/vehicles" className="btn-custom-primary mt-3">Back to Garage</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: 'var(--rs-dark-gray)' }}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>
        <Button as={Link} to="/vehicles" className="btn-custom-outline">
          &larr; Back
        </Button>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Add Record</Card.Title>
              <Form onSubmit={handleAddRecord}>
                <Form.Group className="mb-3">
                  <Form.Label>Record Type</Form.Label>
                  <Form.Select 
                    value={recordType} 
                    onChange={(e) => setRecordType(e.target.value)}
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="modifications">Modification</option>
                  </Form.Select>
                </Form.Group>
                
                {/* New Date Input Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={recordDate}
                    onChange={(e) => setRecordDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g., Oil Change" 
                    value={recordText}
                    onChange={(e) => setRecordText(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mileage</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="e.g., 50000" 
                    value={recordMileage}
                    onChange={(e) => setRecordMileage(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" className="btn-custom-primary w-100 rounded-pill">
                  Save Record
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <Card.Title className="border-bottom pb-2 mb-3">Maintenance Logs</Card.Title>
              {vehicle.maintenance.length === 0 ? (
                <p className="text-muted">No maintenance recorded.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {vehicle.maintenance.map(rec => (
                    <li key={rec.id} className="list-group-item d-flex justify-content-between align-items-start">
                      <div>
                        <div>{rec.description}</div>
                        {rec.mileage && (
                          <small className="text-muted">{rec.mileage} miles</small>
                        )}
                      </div>
                      <span className="text-muted">{rec.date}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="border-bottom pb-2 mb-3">Modification Logs</Card.Title>
              {vehicle.modifications.length === 0 ? (
                <p className="text-muted">No modifications recorded.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {vehicle.modifications.map(rec => (
                    <li key={rec.id} className="list-group-item d-flex justify-content-between align-items-start">
                      <div>
                        <div>{rec.description}</div>
                        {rec.mileage && (
                          <small className="text-muted">{rec.mileage} miles</small>
                        )}
                      </div>
                      <span className="text-muted">{rec.date}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}