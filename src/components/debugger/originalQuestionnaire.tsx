import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { AppContext } from '../../store';

export const OriginalQuestionnaire = () => {
  const { questionnaire } = useContext(AppContext).state;

  return questionnaire?.questionnaire ? (
    <Container
      style={{
        backgroundColor: 'darkred',
        margin: '1rem 0',
        padding: '1rem',
      }}
    >
      <h3>ORIGINAL QUESTIONNAIRE</h3>
      <pre>{JSON.stringify(questionnaire.questionnaire, null, 4)}</pre>
    </Container>
  ) : null;
};
