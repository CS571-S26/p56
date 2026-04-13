import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function VehicleCard({ vehicle }) {
  return (
    <Col sm={6}>
      <Card className="shadow-sm border-0 h-100">
        <Card.Body>
          <Card.Title style={{ color: 'var(--rs-dark-gray)' }}>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </Card.Title>
          <Card.Text className="text-muted">
            Manage maintenance and modifications for this vehicle.
          </Card.Text>
          <Button 
            as={Link} 
            to={`/vehicles/${vehicle.id}`} 
            className="btn-custom-outline rounded-pill px-3 py-1 mt-2"
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}