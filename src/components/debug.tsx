import { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { AppContext } from '../store';

export const DebugContainer = () => {
  const { state } = useContext(AppContext);

  return state.questionnaire && state.showDebugger ? (
    <Container
      className="p-3 mt-3"
      style={{ backgroundColor: '#333', color: '#fff' }}
    >
      <Row>
        <Col>
          <pre>{JSON.stringify(state.questionnaire, null, 4)}</pre>
        </Col>
      </Row>
    </Container>
  ) : null;
};
