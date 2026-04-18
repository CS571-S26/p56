import { Card } from 'react-bootstrap';
import CostBadge from './CostBadge';
import RecordItem from './RecordItem';

export default function RecordListCard({ title, records, type, onDelete }) {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
          {/* We use an h2 here to maintain hierarchy after the h1 on the main page */}
          <Card.Title as="h2" className="mb-0 fs-5">{title}</Card.Title>
          <CostBadge records={records} />
        </div>
        
        {records.length === 0 ? (
          <p className="text-muted">No {type} recorded.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {records.map(rec => (
              <RecordItem 
                key={rec.id} 
                record={rec} 
                type={type} 
                onDelete={onDelete} 
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
}