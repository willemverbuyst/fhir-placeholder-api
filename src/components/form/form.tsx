import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ExampleContext from '../../store';
import { Title } from '../title';

import { QuestionCard } from './questionCard';

export const Form = () => {
  const questionnaire = useContext(ExampleContext);
  const questionnaireItems = questionnaire?.items;

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container className="p-3" style={{ backgroundColor: '#eee' }}>
        {questionnaire && <Title questionnaire={questionnaire} />}
        <Row>
          <Col>
            {questionnaireItems
              ? Object.values(questionnaireItems).map((item, idx) => (
                  <QuestionCard key={idx} item={item} />
                ))
              : null}
          </Col>
        </Row>
      </Container>
    </ExampleContext.Provider>
  );
};
