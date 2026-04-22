import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditRecordModal({ show, onHide, record, onSave }) {
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    setDraft(record);
  }, [record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(draft); 
  };

  if (!draft) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title as="h2" className="fs-5">Edit Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="editForm" onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3" controlId="editDate">
            <Form.Label>Date</Form.Label>
            <div className="d-flex align-items-center gap-2">
              <Form.Control 
                type="date" 
                value={draft.date === "Unknown" ? "" : draft.date} 
                onChange={(e) => setDraft({...draft, date: e.target.value})} 
                disabled={draft.date === "Unknown"}
                required={draft.date !== "Unknown"} 
              />
              {/* Added explicit ID for the checkbox */}
              <Form.Check 
                type="checkbox" 
                id="editUnknownDateCheck"
                label="Unknown" 
                checked={draft.date === "Unknown"}
                onChange={(e) => setDraft({...draft, date: e.target.checked ? "Unknown" : new Date().toISOString().split('T')[0]})}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              value={draft.description} 
              onChange={(e) => setDraft({...draft, description: e.target.value})} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editMileage">
            <Form.Label>Mileage</Form.Label>
            <div className="d-flex align-items-center gap-2">
              <Form.Control 
                type="number" 
                value={draft.mileage === "Unknown" ? "" : draft.mileage} 
                onChange={(e) => setDraft({...draft, mileage: e.target.value})} 
                disabled={draft.mileage === "Unknown"}
              />
              {/* Added explicit ID for the checkbox */}
              <Form.Check 
                type="checkbox" 
                id="editUnknownMileageCheck"
                label="Unknown" 
                checked={draft.mileage === "Unknown"}
                onChange={(e) => setDraft({...draft, mileage: e.target.checked ? "Unknown" : ""})}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editCost">
            <Form.Label>Cost ($)</Form.Label>
            <div className="d-flex align-items-center gap-2">
              <Form.Control 
                type="number" 
                step="0.01" 
                value={draft.cost === "Unknown" ? "" : draft.cost} 
                onChange={(e) => setDraft({...draft, cost: e.target.value})} 
                disabled={draft.cost === "Unknown"}
              />
              {/* Added explicit ID for the checkbox */}
              <Form.Check 
                type="checkbox" 
                id="editUnknownCostCheck"
                label="Unknown" 
                checked={draft.cost === "Unknown"}
                onChange={(e) => setDraft({...draft, cost: e.target.checked ? "Unknown" : ""})}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="editReceipt">
            <Form.Label>Receipt Summary / Notes</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={2} 
              value={draft.receiptSummary || ""} 
              onChange={(e) => setDraft({...draft, receiptSummary: e.target.value})} 
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button type="submit" form="editForm" className="btn-custom-primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}