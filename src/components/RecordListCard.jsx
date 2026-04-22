import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import CostBadge from './CostBadge';
import RecordItem from './RecordItem';

// Added onEdit to the props
export default function RecordListCard({ title, records, type, onDelete, onEdit }) {
  const [sortBy, setSortBy] = useState('date'); 

  const toggleSort = () => {
    setSortBy(sortBy === 'date' ? 'cost' : 'date');
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (sortBy === 'date') {
      if (a.date === "Unknown") return 1;
      if (b.date === "Unknown") return -1;
      return b.date.localeCompare(a.date);
    } else {
      if (a.cost === "Unknown") return 1;
      if (b.cost === "Unknown") return -1;
      return parseFloat(b.cost) - parseFloat(a.cost); 
    }
  });

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
          <Card.Title as="h2" className="mb-0 fs-5">{title}</Card.Title>
          <div className="d-flex align-items-center gap-3">
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={toggleSort}
              disabled={records.length < 2}
            >
              Sort by: {sortBy === 'date' ? 'Date' : 'Cost'}
            </Button>
            <CostBadge records={records} />
          </div>
        </div>
        
        {records.length === 0 ? (
          <p className="text-muted">No {type} recorded.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {sortedRecords.map(rec => (
              <RecordItem 
                key={rec.id} 
                record={rec} 
                type={type} 
                onDelete={onDelete} 
                onEdit={onEdit} /* Passed it down */
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
}