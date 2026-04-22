import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Import our StatCard
import StatCard from '../components/StatCard'; 

export default function Home() {
  // State to hold our aggregated dashboard numbers
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalInvested: "0.00",
    mostRecent: "None"
  });

  // Calculate the stats when the Home page loads
  useEffect(() => {
    const saved = localStorage.getItem('garage-vehicles');
    if (saved) {
      const vehicles = JSON.parse(saved);

      // 1. Calculate Total Vehicles
      const totalVehicles = vehicles.length;

      let totalInvested = 0;
      let allDates = [];

      // Loop through every single vehicle in the array
      vehicles.forEach(v => {
        // Loop through this vehicle's maintenance logs
        v.maintenance.forEach(rec => {
          if (rec.cost !== "Unknown") totalInvested += parseFloat(rec.cost) || 0;
          if (rec.date !== "Unknown") allDates.push(rec.date);
        });
        
        // Loop through this vehicle's modification logs
        v.modifications.forEach(rec => {
          if (rec.cost !== "Unknown") totalInvested += parseFloat(rec.cost) || 0;
          if (rec.date !== "Unknown") allDates.push(rec.date);
        });
      });

      // 3. Find the Most Recent Date
      let mostRecent = "None";
      if (allDates.length > 0) {
        // Sort alphabetically descending, so the newest date string is at index [0]
        allDates.sort((a, b) => b.localeCompare(a));
        mostRecent = allDates[0];
      }

      // Update the state with our final calculations
      setStats({
        totalVehicles,
        totalInvested: totalInvested.toFixed(2),
        mostRecent
      });
    }
  }, []);

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

      {/* --- Analytics Dashboard Row --- */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <StatCard title="Vehicles in Garage" value={stats.totalVehicles} />
        </Col>
        <Col md={4}>
          <StatCard title="Total Money Invested" value={`$${stats.totalInvested}`} />
        </Col>
        <Col md={4}>
          <StatCard title="Most Recent Record" value={stats.mostRecent} />
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="bg-white border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4 d-flex flex-column">
              <Card.Title as="h2" className="display-6 fw-bold mb-3" style={{ color: 'var(--rs-dark-gray)' }}>
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
              <Card.Title as="h2" className="display-6 fw-bold mb-3" style={{ color: 'var(--rs-dark-gray)' }}>
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