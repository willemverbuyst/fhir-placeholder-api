import { useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ExampleContext from '../../store';
import { Title } from '../title';
import { InputSwitch } from './inputSwitch';

export const Form = () => {
  const questionnaire = useContext(ExampleContext);
  const questionnaireItems = questionnaire?.items;

  const renderInput = (item: any, idx: number) => {
    const key = item?.linkId || idx;
    return (
      <div key={key}>
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

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container className="p-3" style={{ backgroundColor: '#eee' }}>
        {questionnaire && <Title questionnaire={questionnaire} />}
        <Row>
          <Col>
            {questionnaireItems
              ? Object.values(questionnaireItems).map((item, idx) => {
                  return renderInput(item, idx);
                })
              : null}
          </Col>
        </Row>
      </Container>
    </ExampleContext.Provider>
  );
};
