import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import RecordListCard from '../components/RecordListCard'; 

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

  // New State for edge cases
  const [isDateUnknown, setIsDateUnknown] = useState(false);
  const [isMileageUnknown, setIsMileageUnknown] = useState(false);
  const [isCostUnknown, setIsCostUnknown] = useState(false);
  const [recordOwner, setRecordOwner] = useState('Me');
  const [recordOwnerOther, setRecordOwnerOther] = useState('');

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
    if (!recordText || (!isDateUnknown && !recordDate)) return;

    const finalDate = isDateUnknown ? "Unknown" : recordDate;
    const finalMileage = isMileageUnknown ? "Unknown" : recordMileage;
    const finalCost = isCostUnknown ? "Unknown" : (parseFloat(recordCost) || 0);
    const finalOwner = recordOwner === 'Other' ? recordOwnerOther || "Other" : recordOwner;

    const newRecord = {
      id: Date.now().toString(),
      date: finalDate, 
      description: recordText,
      mileage: finalMileage,
      cost: finalCost, 
      receiptSummary: recordReceipt,
      owner: finalOwner
    };

    const updatedVehicle = { ...vehicle };
    updatedVehicle[recordType] = [...updatedVehicle[recordType], newRecord];

    const updatedVehicles = vehicles.map(v => v.id === id ? updatedVehicle : v);
    
    setVehicles(updatedVehicles);
    setVehicle(updatedVehicle);
    localStorage.setItem('garage-vehicles', JSON.stringify(updatedVehicles));
    
    // Reset all form state
    setRecordText('');
    setRecordMileage(''); 
    setRecordDate(today);
    setRecordCost('');
    setRecordReceipt('');
    setIsDateUnknown(false);
    setIsMileageUnknown(false);
    setIsCostUnknown(false);
    setRecordOwner('Me');
    setRecordOwnerOther('');
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
        {/* ACCESSIBILITY FIX: H1 for page hierarchy */}
        <h1>Vehicle not found.</h1>
        <Button as={Link} to="/vehicles" className="btn-custom-primary mt-3">Back to Garage</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* ACCESSIBILITY FIX: Changed to H1 so the page has a proper top-level heading */}
        <h1 className="fw-bold mb-0 fs-2" style={{ color: 'var(--rs-dark-gray)' }}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>
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
              <Card.Title as="h2" className="fs-5">Add Record</Card.Title>
              <Form onSubmit={handleAddRecord}>
                
                {/* ACCESSIBILITY FIXES: controlId added to all Form.Groups */}
                <Form.Group className="mb-3" controlId="recordTypeSelect">
                  <Form.Label>Record Type</Form.Label>
                  <Form.Select value={recordType} onChange={(e) => setRecordType(e.target.value)}>
                    <option value="maintenance">Maintenance</option>
                    <option value="modifications">Modification</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="recordOwnerSelect">
                  <Form.Label>Done By (Owner)</Form.Label>
                  <Form.Select value={recordOwner} onChange={(e) => setRecordOwner(e.target.value)}>
                    <option value="Me">Me</option>
                    <option value="Previous Owner">Previous Owner</option>
                    <option value="Other">Other...</option>
                  </Form.Select>
                </Form.Group>

                {recordOwner === 'Other' && (
                  <Form.Group className="mb-3" controlId="recordOwnerOtherInput">
                    <Form.Label>Specify Other Owner</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="e.g., Dealership, Shop Name" 
                      value={recordOwnerOther} 
                      onChange={(e) => setRecordOwnerOther(e.target.value)} 
                      required 
                    />
                  </Form.Group>
                )}
                
                <Form.Group className="mb-3" controlId="recordDateGroup">
                  <Form.Label>Date</Form.Label>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control 
                      type="date" 
                      value={recordDate} 
                      onChange={(e) => setRecordDate(e.target.value)} 
                      disabled={isDateUnknown}
                      required={!isDateUnknown} 
                    />
                    <Form.Check 
                      type="checkbox" 
                      id="unknownDateCheck" 
                      label="Unknown" 
                      checked={isDateUnknown}
                      onChange={(e) => setIsDateUnknown(e.target.checked)}
                      className="text-nowrap"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="recordDescInput">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" placeholder="e.g., Oil Change" value={recordText} onChange={(e) => setRecordText(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="recordMileageGroup">
                  <Form.Label>Mileage</Form.Label>
                   <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control 
                      type="number" 
                      placeholder="e.g., 50000" 
                      value={recordMileage} 
                      onChange={(e) => setRecordMileage(e.target.value)} 
                      disabled={isMileageUnknown}
                    />
                    <Form.Check 
                      type="checkbox" 
                      id="unknownMileageCheck" 
                      label="Unknown" 
                      checked={isMileageUnknown}
                      onChange={(e) => setIsMileageUnknown(e.target.checked)}
                      className="text-nowrap"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="recordCostGroup">
                  <Form.Label>Cost ($)</Form.Label>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control 
                      type="number" 
                      step="0.01" 
                      placeholder="e.g., 59.99" 
                      value={recordCost} 
                      onChange={(e) => setRecordCost(e.target.value)} 
                      disabled={isCostUnknown}
                    />
                    <Form.Check 
                      type="checkbox" 
                      id="unknownCostCheck" 
                      label="Unknown" 
                      checked={isCostUnknown}
                      onChange={(e) => setIsCostUnknown(e.target.checked)}
                      className="text-nowrap"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="recordNotesInput">
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
          <RecordListCard 
            title="Maintenance Logs" 
            records={vehicle.maintenance} 
            type="maintenance" 
            onDelete={handleDeleteRecord} 
          />

          <RecordListCard 
            title="Modification Logs" 
            records={vehicle.modifications} 
            type="modifications" 
            onDelete={handleDeleteRecord} 
          />
        </Col>
      </Row>
    </Container>
  );
}