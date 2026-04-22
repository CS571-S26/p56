import { Form, InputGroup } from 'react-bootstrap';

export default function VehicleSearch({ value, onChange }) {
  return (
    <Form.Group className="mb-4" controlId="vehicleSearchInput">
      {/* Visually hidden label for screen readers to maintain 10/10 WAVE score */}
      <Form.Label className="visually-hidden">Search Vehicles</Form.Label>
      <InputGroup>
        <InputGroup.Text id="search-icon" className="bg-white border-end-0">
          🔍
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by year, make, or model..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-start-0 ps-0"
          aria-label="Search Vehicles"
          aria-describedby="search-icon"
        />
      </InputGroup>
    </Form.Group>
  );
}