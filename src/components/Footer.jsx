import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer 
      className="mt-auto py-4 border-top" 
      style={{ backgroundColor: 'var(--rs-light-gray)' }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <span className="fw-bold" style={{ color: 'var(--rs-dark-gray)' }}>
              &copy; {new Date().getFullYear()} Garage Tracker
            </span>
            <div className="text-muted small mt-1">
              Manage your vehicles, maintenance, and modifications.
            </div>
          </Col>
          
          <Col md={6} className="text-center text-md-end">
            <Link to="/" className="text-decoration-none mx-2 fw-semibold" style={{ color: 'var(--rs-steel-blue)' }}>
              Home
            </Link>
            <Link to="/vehicles" className="text-decoration-none mx-2 fw-semibold" style={{ color: 'var(--rs-steel-blue)' }}>
              My Vehicles
            </Link>
            <Link to="/about" className="text-decoration-none mx-2 fw-semibold" style={{ color: 'var(--rs-steel-blue)' }}>
              About
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}