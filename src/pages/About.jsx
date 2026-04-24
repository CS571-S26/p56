import { Container, Row, Col, Card } from 'react-bootstrap';

export default function About() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-5">
              <h1 className="fw-bold mb-4 fs-2" style={{ color: 'var(--rs-dark-gray)' }}>
                About Garage Tracker
              </h1>
              <p className="fs-5 text-muted mb-4">
                Garage Tracker was built by Drew Voss, a student at UW-Madison, with the assistance of Gemini AI, for full transparency, primarily to act as a tracking system for vehicle maintenance and modifications. It utilizes local storage for vehicle tracking and allows you to manage a garage of multiple vehicles, so you can document and keep track of any vehicles you own.
              </p>
              
              <h2 className="fw-semibold mt-4 mb-3 fs-4" style={{ color: 'var(--rs-steel-blue)' }}>
                Core Features
              </h2>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item bg-transparent px-0 text-muted border-bottom-0 pb-2">
                  <strong>Multiple Vehicles:</strong> Store information for all of your vehicles.
                </li>
                <li className="list-group-item bg-transparent px-0 text-muted border-bottom-0 pb-2">
                  <strong>Maintenance Logs:</strong> Keep detailed records of service history, including descriptions, mileage, and dates.
                </li>
                <li className="list-group-item bg-transparent px-0 text-muted border-bottom-0 pb-2">
                  <strong>Modification Tracking:</strong> Log aftermarket parts and installation dates.
                </li>
              </ul>

              <hr className="my-4" />
              
              <p className="text-muted small mb-0 text-center">
                Built as a web project for CS571: Building User Interfaces.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}