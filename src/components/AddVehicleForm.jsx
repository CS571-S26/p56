import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export default function AddVehicleForm({ onAdd }) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!make || !model || !year) return;

    const newId = Date.now().toString();

    onAdd({ 
      id: newId, 
      make, 
      model, 
      year,
      maintenance: [],
      modifications: []
    });
    
    setMake('');
    setModel('');
    setYear('');
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <Card.Title className="mb-3" style={{ color: 'var(--rs-dark-gray)' }}>
          Add a New Vehicle
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="e.g., 2015" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Make</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="e.g., Toyota" 
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Model</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="e.g., Camry" 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required 
            />
          </Form.Group>
          <Button type="submit" className="btn-custom-primary w-100 rounded-pill">
            Save Vehicle
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}