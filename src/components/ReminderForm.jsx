import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function ReminderForm({ onAdd }) {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [targetMileage, setTargetMileage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;
    onAdd({ 
      id: Date.now().toString(), 
      task, 
      date: date || null, 
      targetMileage: targetMileage ? parseFloat(targetMileage) : null 
    });
    setTask(''); setDate(''); setTargetMileage('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3 border-top pt-3">
      <Form.Group className="mb-2" controlId="reminderTaskInput">
        <Form.Label className="small fw-bold">Task Description</Form.Label>
        <Form.Control size="sm" type="text" value={task} onChange={(e) => setTask(e.target.value)} required />
      </Form.Group>
      <Row className="g-2">
        <Col xs={6}>
          <Form.Group controlId="reminderDateInput">
            <Form.Label className="small fw-bold">Due Date</Form.Label>
            <Form.Control size="sm" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group controlId="reminderMileageInput">
            <Form.Label className="small fw-bold">At Miles</Form.Label>
            <Form.Control size="sm" type="number" value={targetMileage} onChange={(e) => setTargetMileage(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="btn-custom-primary w-100 mt-2 btn-sm rounded-pill">Add Reminder</Button>
    </Form>
  );
}