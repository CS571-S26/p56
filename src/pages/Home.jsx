import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container className="py-5">
      <Row className="align-items-center mb-5 mt-4">
        <Col md={8}>
          <h1 className="display-4 fw-bold" style={{ color: 'var(--rs-dark-gray)' }}>
            Vehicle Management Dashboard
          </h1>
          <p className="lead" style={{ color: 'var(--rs-dark-gray)' }}>
            Select an option below to view or manage vehicle records.
          </p>
          <Button as={Link} to="/vehicles" className="btn-custom-primary px-4 py-2 mt-2 fs-5 rounded-pill shadow-sm">
            Manage Vehicles
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="bg-white border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4 d-flex flex-column">
              <Card.Title className="display-6 fw-bold mb-3" style={{ color: 'var(--rs-dark-gray)' }}>
                Maintenance Records
              </Card.Title>
              <Card.Text className="text-muted fs-5 mb-4">
                Keep detailed records of all your service history, including oil changes, tire rotations, and scheduled upkeep.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="bg-white border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4 d-flex flex-column">
              <Card.Title className="display-6 fw-bold mb-3" style={{ color: 'var(--rs-dark-gray)' }}>
                Modification Records
              </Card.Title>
              <Card.Text className="text-muted fs-5 mb-4">
                Track aftermarket parts, log installation dates, and maintain a complete history of your vehicle's custom build.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}