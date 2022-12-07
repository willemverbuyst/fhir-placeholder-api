import { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ExampleContext from '../store';

export const DebugContainer = () => {
  const questionnaire = useContext(ExampleContext);
  return (
    <ExampleContext.Provider value={questionnaire}>
      {questionnaire ? (
        <Container
          className="p-3 mt-3"
          style={{ backgroundColor: '#333', color: '#fff' }}
        >
          <Row>
            <Col>
              <pre>{JSON.stringify(questionnaire, null, 4)}</pre>
            </Col>
          </Row>
        </Container>
      ) : null}
    </ExampleContext.Provider>
  );
};
