import { Badge } from 'react-bootstrap';

export default function CostBadge({ records }) {
  const calculateTotalCost = (recordsArray) => {
    if (!recordsArray) return "0.00";
    const total = recordsArray.reduce((sum, record) => {
      const itemCost = parseFloat(record.cost) || 0; 
      return sum + itemCost;
    }, 0); 
    return total.toFixed(2);
  };

  return (
    <Badge bg="secondary" className="fs-6">
      Total: ${calculateTotalCost(records)}
    </Badge>
  );
}