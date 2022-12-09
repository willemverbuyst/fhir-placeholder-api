import { Card, Button } from 'react-bootstrap';
import { InputSwitch } from './inputSwitch';

export const QuestionCard = ({ item }: any) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <InputSwitch item={item} />
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
