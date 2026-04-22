import { Button, Badge } from 'react-bootstrap';

// Added onEdit to the props
export default function RecordItem({ record, type, onDelete, onEdit }) {
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-start mb-1">
        <div>
          <strong style={{ color: 'var(--rs-steel-azure)' }} className="me-2">{record.description}</strong>
          {record.owner && (
             <Badge bg="info" className="fw-normal text-dark">
               By: {record.owner}
             </Badge>
          )}
        </div>
        <div>
          <span className="text-muted me-3">{record.date}</span>
          
          {/* Edit Button */}
          <Button 
            variant="outline-primary" 
            size="sm" 
            className="me-2"
            style={{ padding: '0.1rem 0.4rem', fontSize: '0.8rem' }}
            onClick={() => onEdit(type, record)}
          >
            Edit
          </Button>

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
        <span>{record.mileage && record.mileage !== "Unknown" ? `${record.mileage} miles` : 'Mileage Unknown'}</span>
        <span className="fw-bold text-dark">
          {record.cost === "Unknown" ? 'Cost Unknown' : `$${parseFloat(record.cost).toFixed(2)}`}
        </span>
      </div>
      {record.receiptSummary && (
        <div className="bg-light p-2 rounded small" style={{ color: 'var(--rs-dark-gray)' }}>
          <strong className="text-dark">Receipt Note:</strong> {record.receiptSummary}
        </div>
      )}
    </li>
  );
}