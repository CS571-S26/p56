import { Button } from 'react-bootstrap';

export default function RecordItem({ record, type, onDelete }) {
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-start mb-1">
        <strong style={{ color: 'var(--rs-steel-azure)' }}>{record.description}</strong>
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
        <span>{record.mileage ? `${record.mileage} miles` : 'No mileage'}</span>
        <span className="fw-bold text-dark">${record.cost.toFixed(2)}</span>
      </div>
      {record.receiptSummary && (
        <div className="bg-light p-2 rounded small text-secondary">
          <strong>Receipt Note:</strong> {record.receiptSummary}
        </div>
      )}
    </li>
  );
}