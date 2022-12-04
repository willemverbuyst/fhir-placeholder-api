import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Stack,
  ToggleButton,
} from 'react-bootstrap';
import { main } from '../business';
import { examples } from '../examples';
import { Item } from '../interfaces/questionnaire';
import { Text } from './text';

export const ButtonRow = () => {
  const [checked, setChecked] = useState<string>();
  const [questionnaire, setQuestionnaire] = useState<{
    [key: PropertyKey]: Item;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLElement>, idx: number) => {
    console.log('e.currentTarget :>> ', e.currentTarget);
    setChecked(e.currentTarget.id);
    const qFlat = main(examples[idx]);
    setQuestionnaire(qFlat);
  };

  return (
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

      <Row>
        {/* <pre>{JSON.stringify(questionnaire, null, 4)}</pre> */}
        <Col>
          {questionnaire &&
            Object.values(questionnaire).map((q) => (
              <Text
                text={
                  q.text ||
                  (q.code && q.code[0].display) ||
                  (q.code && q.code[0].code) ||
                  'nothing to show'
                }
              />
            ))}
        </Col>
      </Row>
    </Container>
  );
};
