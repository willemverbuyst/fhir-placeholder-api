import { Card, Button, Stack } from 'react-bootstrap';
import { TypeGroup } from '../itemTypes';
import { InputSwitch } from './inputSwitch';

export const QuestionCard = ({
  item,
  onNext,
  onPrevious,
  displayNext,
  displayPrevious,
}: any) => {
  if (!item) return null;
  return (
    <div>
      <Card>
        <Card.Body>
          {item.groupLabel && <TypeGroup item={item} />}
          <InputSwitch item={item} />
          <Stack direction="horizontal">
            {displayPrevious ? (
              <Button
                className="m-2"
                variant="outline-primary"
                type="submit"
                onClick={onPrevious}
              >
                Previous
              </Button>
            ) : null}
            {displayNext ? (
              <Button
                className="m-2"
                variant="primary"
                type="submit"
                onClick={onNext}
              >
                Next
              </Button>
            ) : null}
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
};
