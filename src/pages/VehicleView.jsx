import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import RecordListCard from '../components/RecordListCard'; 
import EditRecordModal from '../components/EditRecordModal';
import ReminderForm from '../components/ReminderForm';
import ReminderList from '../components/ReminderList';

export default function VehicleView() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  
  // --- ADD RECORD STATE ---
  const [recordType, setRecordType] = useState('maintenance');
  const [recordDate, setRecordDate] = useState(today);
  const [recordText, setRecordText] = useState('');
  const [recordMileage, setRecordMileage] = useState(''); 
  const [recordCost, setRecordCost] = useState('');
  const [recordReceipt, setRecordReceipt] = useState('');
  const [isDateUnknown, setIsDateUnknown] = useState(false);
  const [isMileageUnknown, setIsMileageUnknown] = useState(false);
  const [isCostUnknown, setIsCostUnknown] = useState(false);
  const [recordOwner, setRecordOwner] = useState('Me');
  const [recordOwnerOther, setRecordOwnerOther] = useState('');

  // --- UI STATE ---
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null); 
  const [editType, setEditType] = useState(''); 

  useEffect(() => {
    const saved = localStorage.getItem('garage-vehicles');
    if (saved) {
      const parsedVehicles = JSON.parse(saved);
      setVehicles(parsedVehicles);
      const foundVehicle = parsedVehicles.find(v => v.id === id);
      setVehicle(foundVehicle);
    }
  }, [id]);

  const handleOdometerChange = (newMileage) => {
    const updatedVehicle = { ...vehicle, currentMileage: parseFloat(newMileage) || 0 };
    saveAndUpdateState(updatedVehicle);
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!recordText || (!isDateUnknown && !recordDate)) return;

    // 1. Parse the incoming mileage to ensure it's a number
    const parsedRecordMileage = parseFloat(recordMileage);
    
    // 2. Build the new record object
    const newRecord = {
      id: Date.now().toString(),
      date: isDateUnknown ? "Unknown" : recordDate, 
      description: recordText,
      mileage: isMileageUnknown ? "Unknown" : recordMileage,
      cost: isCostUnknown ? "Unknown" : (parseFloat(recordCost) || 0), 
      receiptSummary: recordReceipt,
      owner: recordOwner === 'Other' ? recordOwnerOther || "Other" : recordOwner
    };

    // 3. Clone the vehicle to update it
    const updatedVehicle = { ...vehicle };
    updatedVehicle[recordType] = [...updatedVehicle[recordType], newRecord];

    // Check if the user entered a valid number, and if that number is HIGHER than the current odometer.
    if (!isMileageUnknown && !isNaN(parsedRecordMileage)) {
      const currentOdometer = updatedVehicle.currentMileage || 0;
      if (parsedRecordMileage > currentOdometer) {
        updatedVehicle.currentMileage = parsedRecordMileage; // Auto-update the car's mileage!
      }
    }

    saveAndUpdateState(updatedVehicle);
    
    // Reset form
    setRecordText(''); setRecordMileage(''); setRecordDate(today); setRecordCost(''); setRecordReceipt('');
    setIsDateUnknown(false); setIsMileageUnknown(false); setIsCostUnknown(false);
    setRecordOwner('Me'); setRecordOwnerOther('');
    setToastMessage("Record added!");
    setShowToast(true);
  };

  const handleAddReminder = (newReminder) => {
    const updatedVehicle = { ...vehicle };
    updatedVehicle.reminders = [...(updatedVehicle.reminders || []), newReminder];
    saveAndUpdateState(updatedVehicle);
    setToastMessage("Reminder set!");
    setShowToast(true);
  };

  const handleDeleteReminder = (reminderId) => {
    const updatedVehicle = { ...vehicle };
    updatedVehicle.reminders = (updatedVehicle.reminders || []).filter(r => r.id !== reminderId);
    saveAndUpdateState(updatedVehicle);
  };

  const handleSaveEdit = (updatedRecord) => {
    const updatedVehicle = { ...vehicle };
    updatedVehicle[editType] = updatedVehicle[editType].map(rec => 
      rec.id === updatedRecord.id ? updatedRecord : rec
    );
    saveAndUpdateState(updatedVehicle);
    setShowEditModal(false);
    setToastMessage("Record updated!");
    setShowToast(true);
  };

  const saveAndUpdateState = (updatedVehicle) => {
    const updatedVehicles = vehicles.map(v => v.id === id ? updatedVehicle : v);
    setVehicles(updatedVehicles);
    setVehicle(updatedVehicle);
    localStorage.setItem('garage-vehicles', JSON.stringify(updatedVehicles));
  };

  const handleDeleteRecord = (type, recordId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      const updatedVehicle = { ...vehicle };
      updatedVehicle[type] = updatedVehicle[type].filter(rec => rec.id !== recordId);
      saveAndUpdateState(updatedVehicle);
    }
  };

  const handleDeleteVehicle = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
    if (confirmDelete) {
      const updatedVehicles = vehicles.filter(v => v.id !== id);
      localStorage.setItem('garage-vehicles', JSON.stringify(updatedVehicles));
      navigate('/vehicles'); 
    }
  };

  const handleEditClick = (type, record) => {
    setEditType(type);
    setEditingRecord(record); 
    setShowEditModal(true);
  };

  if (!vehicle) return <Container className="py-5 text-center"><h1>Loading...</h1></Container>;

  return (
    <Container className="py-5 position-relative">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 className="fw-bold mb-1 fs-2" style={{ color: 'var(--rs-dark-gray)' }}>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <Form.Group className="d-flex align-items-center gap-2 mt-2" controlId="odometerUpdate">
            <Form.Label className="text-muted fw-semibold mb-0">Odometer:</Form.Label>
            <Form.Control 
              type="number" 
              size="sm" 
              style={{ width: '120px' }} 
              value={vehicle.currentMileage || 0} 
              onChange={(e) => handleOdometerChange(e.target.value)} 
            />
            <span className="text-muted small">miles</span>
          </Form.Group>
        </div>
        <div>
          <Button variant="danger" className="me-2" onClick={handleDeleteVehicle}>Delete Vehicle</Button>
          <Button as={Link} to="/vehicles" className="btn-custom-outline">&larr; Back</Button>
        </div>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <Card.Title as="h2" className="fs-5">Add Record</Card.Title>
              <Form onSubmit={handleAddRecord}>
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
                    <Form.Control type="text" placeholder="e.g., Shop Name" value={recordOwnerOther} onChange={(e) => setRecordOwnerOther(e.target.value)} required />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="recordDateGroup">
                  <Form.Label>Date</Form.Label>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control type="date" value={recordDate} onChange={(e) => setRecordDate(e.target.value)} disabled={isDateUnknown} required={!isDateUnknown} />
                    <Form.Check type="checkbox" id="unknownDateCheck" label="Unknown" checked={isDateUnknown} onChange={(e) => setIsDateUnknown(e.target.checked)} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="recordDescInput">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" value={recordText} onChange={(e) => setRecordText(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="recordMileageGroup">
                  <Form.Label>Mileage</Form.Label>
                   <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control type="number" value={recordMileage} onChange={(e) => setRecordMileage(e.target.value)} disabled={isMileageUnknown} />
                    <Form.Check type="checkbox" id="unknownMileageCheck" label="Unknown" checked={isMileageUnknown} onChange={(e) => setIsMileageUnknown(e.target.checked)} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="recordCostGroup">
                  <Form.Label>Cost ($)</Form.Label>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Form.Control type="number" step="0.01" value={recordCost} onChange={(e) => setRecordCost(e.target.value)} disabled={isCostUnknown} />
                    <Form.Check type="checkbox" id="unknownCostCheck" label="Unknown" checked={isCostUnknown} onChange={(e) => setIsCostUnknown(e.target.checked)} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="recordNotesInput">
                  <Form.Label>Receipt Summary / Notes</Form.Label>
                  <Form.Control as="textarea" rows={2} value={recordReceipt} onChange={(e) => setRecordReceipt(e.target.value)} />
                </Form.Group>
                <Button type="submit" className="btn-custom-primary w-100 rounded-pill">Save Record</Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title as="h2" className="fs-5">Maintenance Reminders</Card.Title>
              <ReminderList 
                reminders={vehicle.reminders || []} 
                currentMileage={vehicle.currentMileage || 0} 
                onDelete={handleDeleteReminder} 
              />
              <ReminderForm onAdd={handleAddReminder} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <RecordListCard title="Maintenance Logs" records={vehicle.maintenance} type="maintenance" onDelete={handleDeleteRecord} onEdit={handleEditClick} />
          <RecordListCard title="Modification Logs" records={vehicle.modifications} type="modifications" onDelete={handleDeleteRecord} onEdit={handleEditClick} />
        </Col>
      </Row>

      <EditRecordModal show={showEditModal} onHide={() => setShowEditModal(false)} record={editingRecord} onSave={handleSaveEdit} />
      
      <ToastContainer position="bottom-end" className="p-4" style={{ position: 'fixed', zIndex: 1050 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Header closeButton={false}><strong className="me-auto text-success">Garage Tracker</strong></Toast.Header>
          <Toast.Body className="text-white fw-semibold">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}