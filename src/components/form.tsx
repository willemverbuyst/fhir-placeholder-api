import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ExampleContext from '../store';
import { Text } from './text';

export const Form = () => {
  const questionnaire = useContext(ExampleContext);

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container>
        <Row>
          {/* <pre>{JSON.stringify(questionnaire, null, 4)}</pre> */}
          <Col>
            {questionnaire
              ? Object.values(questionnaire).map((q, idx) => (
                  <Text
                    key={q?.linkId || idx}
                    text={
                      q?.text ||
                      (q?.code && q.code[0].display) ||
                      (q?.code && q.code[0].code) ||
                      'nothing to show'
                    }
                  />
                ))
              : null}
          </Col>
        </Row>
      </Container>
    </ExampleContext.Provider>
  );
};
