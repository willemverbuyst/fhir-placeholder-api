import { useState } from 'react';
import {
  ButtonGroup,
  Col,
  Container,
  Row,
  ToggleButton,
} from 'react-bootstrap';
import { main } from '../business';
import { examples } from '../examples';
import ExampleContext, { ExampleState } from '../store';
import { DebugContainer } from './debug';
import { Form } from './form';

export const Cockpit = () => {
  const [checked, setChecked] = useState<string>();
  const [questionnaire, setQuestionnaire] = useState<ExampleState>(null);

  const handleChange = (e: React.ChangeEvent<HTMLElement>, idx: number) => {
    setChecked(e.currentTarget.id);
    const qFlat = main(examples[idx]);
    setQuestionnaire(qFlat);
  };

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container>
        <Row className="m-4">
          <Col className="d-flex justify-content-center">
            <ButtonGroup>
              {examples.map((example, idx) => (
                <ToggleButton
                  key={example.id}
                  id={example.id}
                  type="radio"
                  name="example"
                  value={example.id}
                  variant="outline-success"
                  checked={checked === example.id}
                  onChange={(e) => handleChange(e, idx)}
                >{`example ${idx + 1}`}</ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      {questionnaire && <Form />}
      <DebugContainer />
    </ExampleContext.Provider>
  );
};
