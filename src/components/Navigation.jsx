import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-custom shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-custom-accent fw-bold fs-4">
          Garage Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/vehicles" className="fw-semibold">My Vehicles</Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}