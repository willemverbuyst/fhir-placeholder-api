import { Col, Container, Row } from 'react-bootstrap';
import { examples } from '../examples';
import { Text } from './text';

export const Form = () => {
  const questionnaire = examples[0];

  return (
    <Container>
      <Row>
        {/* <pre>{JSON.stringify(questionnaire, null, 4)}</pre> */}
        <Col>
          {questionnaire &&
            Object.values(questionnaire).map((q) => (
              <Text
                text={
                  q.text ||
                  (q.code && q.code[0].display) ||
                  (q.code && q.code[0].code) ||
                  'nothing to show'
                }
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
};
