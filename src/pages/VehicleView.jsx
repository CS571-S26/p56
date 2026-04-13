import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import CostBadge from '../components/CostBadge'; // 1. Import Badge
import RecordItem from '../components/RecordItem'; // 2. Import Record Item

export default function VehicleView() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  
  const today = new Date().toISOString().split('T')[0];
  
  const [recordType, setRecordType] = useState('maintenance');
  const [recordDate, setRecordDate] = useState(today);
  const [recordText, setRecordText] = useState('');
  const [recordMileage, setRecordMileage] = useState(''); 
  const [recordCost, setRecordCost] = useState('');
  const [recordReceipt, setRecordReceipt] = useState('');

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
      date: recordDate, 
      description: recordText,
      mileage: recordMileage,
      cost: parseFloat(recordCost) || 0, 
      receiptSummary: recordReceipt
    };

    const updatedVehicle = { ...vehicle };
    updatedVehicle[recordType] = [...updatedVehicle[recordType], newRecord];

    const updatedVehicles = vehicles.map(v => v.id === id ? updatedVehicle : v);
    
    setVehicles(updatedVehicles);
    setVehicle(updatedVehicle);
    localStorage.setItem('garage-vehicles', JSON.stringify(updatedVehicles));
    
    setRecordText('');
    setRecordMileage(''); 
    setRecordDate(today);
    setRecordCost('');
    setRecordReceipt('');
  };

  const handleDeleteVehicle = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle? All records will be lost.");
    if (confirmDelete) {
      const updatedVehicles = vehicles.filter(v => v.id !== id);
      localStorage.setItem('garage-vehicles', JSON.stringify(updatedVehicles));
      navigate('/vehicles'); 
    }
  };

  const handleDeleteRecord = (type, recordId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      const updatedVehicle = { ...vehicle };
      updatedVehicle[type] = updatedVehicle[type].filter(rec => rec.id !== recordId);
      const updatedVehicles = vehicles.map(v => v.id === id ? updatedVehicle : v);
      
      setVehicles(updatedVehicles);
      setVehicle(updatedVehicle);
      localStorage.setItem('garage-vehicles', JSON.stringify(updatedVehicles));
    }
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
        <h2 className="fw-bold mb-0" style={{ color: 'var(--rs-dark-gray)' }}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>
        <div>
          <Button variant="danger" className="me-2" onClick={handleDeleteVehicle}>
            Delete Vehicle
          </Button>
          <Button as={Link} to="/vehicles" className="btn-custom-outline">
            &larr; Back
          </Button>
        </div>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Add Record</Card.Title>
              <Form onSubmit={handleAddRecord}>
                {/* Form inputs remain exactly the same */}
                <Form.Group className="mb-3">
                  <Form.Label>Record Type</Form.Label>
                  <Form.Select value={recordType} onChange={(e) => setRecordType(e.target.value)}>
                    <option value="maintenance">Maintenance</option>
                    <option value="modifications">Modification</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="e.g., Oil Change" value={recordText} onChange={(e) => setRecordText(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mileage</Form.Label>
                  <Form.Control type="number" placeholder="e.g., 50000" value={recordMileage} onChange={(e) => setRecordMileage(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Cost ($)</Form.Label>
                  <Form.Control type="number" step="0.01" placeholder="e.g., 59.99" value={recordCost} onChange={(e) => setRecordCost(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Receipt Summary / Notes</Form.Label>
                  <Form.Control as="textarea" rows={2} placeholder="e.g., Bought synthetic oil and filter from AutoZone." value={recordReceipt} onChange={(e) => setRecordReceipt(e.target.value)} />
                </Form.Group>

                <Button type="submit" className="btn-custom-primary w-100 rounded-pill">
                  Save Record
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {/* Maintenance Card */}
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <Card.Title className="mb-0">Maintenance Logs</Card.Title>
                {/* 3. Meaningfully use the CostBadge */}
                <CostBadge records={vehicle.maintenance} />
              </div>
              
              {vehicle.maintenance.length === 0 ? (
                <p className="text-muted">No maintenance recorded.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {/* 4. Meaningfully use the RecordItem */}
                  {vehicle.maintenance.map(rec => (
                    <RecordItem 
                      key={rec.id} 
                      record={rec} 
                      type="maintenance" 
                      onDelete={handleDeleteRecord} 
                    />
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>

          {/* Modifications Card */}
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <Card.Title className="mb-0">Modification Logs</Card.Title>
                {/* 3. Meaningfully use the CostBadge */}
                <CostBadge records={vehicle.modifications} />
              </div>

              {vehicle.modifications.length === 0 ? (
                <p className="text-muted">No modifications recorded.</p>
              ) : (
                <ul className="list-group list-group-flush">
                   {/* 4. Meaningfully use the RecordItem */}
                  {vehicle.modifications.map(rec => (
                    <RecordItem 
                      key={rec.id} 
                      record={rec} 
                      type="modifications" 
                      onDelete={handleDeleteRecord} 
                    />
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