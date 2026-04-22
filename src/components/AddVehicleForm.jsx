import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export default function AddVehicleForm({ onAdd }) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [currentMileage, setCurrentMileage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!make || !model || !year || !currentMileage) return;

    onAdd({ 
      id: Date.now().toString(), 
      make, model, year,
      currentMileage: parseFloat(currentMileage) || 0,
      maintenance: [], modifications: [], reminders: []
    });
    
    setMake(''); setModel(''); setYear(''); setCurrentMileage('');
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title as="h2" className="fs-5 mb-3" style={{ color: 'var(--rs-dark-gray)' }}>Add a New Vehicle</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="vehicleYear">
            <Form.Label>Year</Form.Label>
            <Form.Control type="number" placeholder="2015" value={year} onChange={(e) => setYear(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="vehicleMake">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" placeholder="Toyota" value={make} onChange={(e) => setMake(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="vehicleModel">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" placeholder="Camry" value={model} onChange={(e) => setModel(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="vehicleMileage">
            <Form.Label>Current Odometer Reading</Form.Label>
            <Form.Control type="number" placeholder="50000" value={currentMileage} onChange={(e) => setCurrentMileage(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="btn-custom-primary w-100 rounded-pill">Save Vehicle</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}