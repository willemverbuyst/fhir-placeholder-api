import { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { AppContext } from '../store';

export const Debugger = () => {
  const { questionnaire, showDebugger } = useContext(AppContext).state;

  return questionnaire && showDebugger ? (
    <Container
      className="p-3 mt-3"
      style={{ backgroundColor: '#333', color: '#fff' }}
    >
      <Row>
        <Col>
          {questionnaire.questionnaire?.text?.div ? (
            <div
              style={{
                backgroundColor: 'darkgreen',
                marginBottom: '1rem',
                padding: '1rem',
              }}
              dangerouslySetInnerHTML={{
                __html: questionnaire.questionnaire.text?.div,
              }}
            ></div>
          ) : null}
          <pre>{JSON.stringify(questionnaire, null, 4)}</pre>
        </Col>
      </Row>
    </Container>
  ) : null;
};
