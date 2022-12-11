import { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { AppContext } from '../../store';
import { ConvertedQuestionnaire } from './convertedQuestionnaire';
import { HTML } from './html';
import { OriginalQuestionnaire } from './originalQuestionnaire';

export const Debugger = () => {
  const { questionnaire, showDebugger } = useContext(AppContext).state;

  return questionnaire && showDebugger ? (
    <Container
      className="p-3 mt-3"
      style={{ backgroundColor: '#333', color: '#fff' }}
    >
      <Row>
        <Col>
          <HTML />
          <ConvertedQuestionnaire />
          <OriginalQuestionnaire />
        </Col>
      </Row>
    </Container>
  ) : null;
};
