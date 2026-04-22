import { Card } from 'react-bootstrap';

export default function StatCard({ title, value }) {
  return (
    <Card className="shadow-sm border-0 h-100 rounded-4">
      <Card.Body className="p-4 text-center d-flex flex-column justify-content-center">
        <Card.Title as="h2" className="fs-5 text-muted mb-2">
          {title}
        </Card.Title>
        
        <h3 className="display-5 fw-bold mb-0" style={{ color: 'var(--rs-steel-azure)' }}>
          {value}
        </h3>
        
      </Card.Body>
    </Card>
  );
}