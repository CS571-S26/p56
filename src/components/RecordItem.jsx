import { Button, Badge } from 'react-bootstrap';

export default function RecordItem({ record, type, onDelete }) {
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-start mb-1">
        <div>
          <strong style={{ color: 'var(--rs-steel-azure)' }} className="me-2">{record.description}</strong>
          {/* Displays the new owner field as a tag if it exists */}
          {record.owner && (
             <Badge bg="info" className="fw-normal bg-opacity-75 text-dark">
               By: {record.owner}
             </Badge>
          )}
        </div>
        <div>
          <span className="text-muted me-3">{record.date}</span>
          <Button 
            variant="outline-danger" 
            size="sm" 
            style={{ padding: '0.1rem 0.4rem', fontSize: '0.8rem' }}
            onClick={() => onDelete(type, record.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-between text-muted small mb-2">
        {/* Handles the Unknown string for mileage */}
        <span>{record.mileage && record.mileage !== "Unknown" ? `${record.mileage} miles` : 'Mileage Unknown'}</span>
        
        {/* Handles the Unknown string for cost so .toFixed(2) doesn't crash the app */}
        <span className="fw-bold text-dark">
          {record.cost === "Unknown" ? 'Cost Unknown' : `$${record.cost.toFixed(2)}`}
        </span>
      </div>
      {record.receiptSummary && (
        <div className="bg-light p-2 rounded small text-secondary">
          <strong>Receipt Note:</strong> {record.receiptSummary}
        </div>
      )}
    </li>
  );
}