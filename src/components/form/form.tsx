import { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ExampleContext from '../../store';
import { Title } from '../title';

import { QuestionCard } from './questionCard';

export const Form = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const questionnaire = useContext(ExampleContext);
  const questionnaireItems = questionnaire?.items;

  const handleNext = () => {
    if (currentQuestion < questionnaire.items.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container className="p-3" style={{ backgroundColor: '#eee' }}>
        {questionnaire && <Title questionnaire={questionnaire} />}
        <Row>
          <Col>
            {questionnaireItems ? (
              <QuestionCard
                item={Object.values(questionnaireItems)[currentQuestion]}
                onNext={handleNext}
                onPrevious={handlePrevious}
                displayNext={currentQuestion < questionnaire.items.length - 1}
                displayPrevious={currentQuestion > 0}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </ExampleContext.Provider>
  );
};
