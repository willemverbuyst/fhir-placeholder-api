import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { main } from '../business';
import { examples } from '../examples';
import { Item } from '../interfaces/questionnaire';
import { Text } from './text';

export const ButtonRow = () => {
  const [questionnaire, setQuestionnaire] = useState<{
    [key: PropertyKey]: Item;
  } | null>(null);

  const handleClick = (i: number) => {
    const qFlat = main(examples[i]);
    setQuestionnaire(qFlat);
  };

  return (
    <>
      <Row>
        {examples.map((example, i) => (
          <Col key={example.id}>
            <Button className="p-2" onClick={() => handleClick(i)}>{`example ${
              i + 1
            }`}</Button>
          </Col>
        ))}
      </Row>
      <Row>
        {/* <pre>{JSON.stringify(questionnaire, null, 4)}</pre> */}
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
      </Row>
    </>
  );
};
