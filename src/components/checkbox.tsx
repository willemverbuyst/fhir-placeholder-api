import { Form } from 'react-bootstrap';
import { Item } from '../interfaces/questionnaire';

export const Checkbox: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Check type="checkbox" id="check" label={item.text} />
    </Form.Group>
  );
};
