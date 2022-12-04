import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ExampleContext from '../store';
import { Checkbox } from './checkbox';
import { Choice } from './choice';
import { Text } from './text';
import { TextInput } from './textInput';
import { Title } from './title';

export const Form = () => {
  const questionnaire = useContext(ExampleContext);
  const questionnaireItems = questionnaire?.item;

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container className="p-3" style={{ backgroundColor: '#eee' }}>
        {questionnaire && <Title questionnaire={questionnaire} />}
        <Row>
          <Col>
            {questionnaireItems
              ? Object.values(questionnaireItems).map((q, idx) =>
                  q?.type === 'boolean' ? (
                    <Checkbox key={q?.linkId || idx} item={q} />
                  ) : q?.type === 'string' ? (
                    <TextInput key={q?.linkId || idx} item={q} />
                  ) : q?.type === 'choice' ? (
                    <Choice key={q?.linkId || idx} item={q} />
                  ) : (
                    <Text
                      key={q?.linkId || idx}
                      text={
                        q?.text ||
                        (q?.code && q.code[0].display) ||
                        (q?.code && q.code[0].code) ||
                        ''
                      }
                    />
                  )
                )
              : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <pre
              className="p-2"
              style={{ backgroundColor: '#333', color: '#fff' }}
            >
              {JSON.stringify(questionnaire, null, 4)}
            </pre>
          </Col>
        </Row>
      </Container>
    </ExampleContext.Provider>
  );
};
