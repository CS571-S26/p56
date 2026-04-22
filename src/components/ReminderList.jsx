import { ListGroup, Badge, Button } from 'react-bootstrap';

export default function ReminderList({ reminders, currentMileage, onDelete }) {
  const isOverdue = (r) => {
    const today = new Date().toISOString().split('T')[0];
    const dateOverdue = r.date && r.date < today;
    const mileageOverdue = r.targetMileage && currentMileage >= r.targetMileage;
    return dateOverdue || mileageOverdue;
  };

  if (reminders.length === 0) {
    return <p className="text-muted small my-3">No upcoming reminders.</p>;
  }

  return (
    <ListGroup variant="flush" className="my-2">
      {reminders.map((r) => {
        const overdue = isOverdue(r);
        return (
          <ListGroup.Item key={r.id} className="d-flex justify-content-between align-items-center px-0 bg-transparent border-bottom-0">
            <div>
              <div className={`fw-bold mb-0 ${overdue ? 'text-danger' : 'text-dark'}`}>{r.task}</div>
              <div className="small text-muted">
                {r.date && `Due: ${r.date} `}
                {r.targetMileage && `At: ${r.targetMileage} miles`}
                {overdue && <Badge bg="danger" className="ms-2 opacity-75">Overdue</Badge>}
              </div>
            </div>
            <Button variant="outline-danger" size="sm" className="rounded-circle border-0" onClick={() => onDelete(r.id)}>&times;</Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}