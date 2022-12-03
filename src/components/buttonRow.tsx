import { Button, Col, Row } from 'react-bootstrap';
import { examples } from '../examples';

export const ButtonRow = () => {
  return (
    <Row>
      {examples.map((example, i) => (
        <Col key={example.id}>
          <Button className="p-2">{`example ${i + 1}`}</Button>
        </Col>
      ))}
    </Row>
  );
};
