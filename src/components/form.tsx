import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ExampleContext from '../store';
import {
  TypeBoolean,
  TypeChoice,
  TypeDate,
  TypeDateTime,
  TypeDecimal,
  TypeGroup,
  TypeInteger,
  TypeString,
} from './itemTypes';
import { Text } from './text';
import { Title } from './title';

export const Form = () => {
  const questionnaire = useContext(ExampleContext);
  const questionnaireItems = questionnaire?.items;

  const renderInput = (item: any, idx: number) => {
    const key = item?.linkId || idx;
    return item?.type === 'boolean' ? (
      <TypeBoolean key={key} item={item} />
    ) : item?.type === 'string' ? (
      <TypeString key={key} item={item} />
    ) : item?.type === 'integer' ? (
      <TypeInteger key={key} item={item} />
    ) : item?.type === 'date' ? (
      <TypeDate key={key} item={item} />
    ) : item?.type === 'dateTime' ? (
      <TypeDateTime key={key} item={item} />
    ) : item?.type === 'group' ? (
      <TypeGroup key={key} item={item} />
    ) : item?.type === 'decimal' ? (
      <TypeDecimal key={key} item={item} />
    ) : item?.type === 'choice' && questionnaire ? (
      <TypeChoice key={key} item={item} />
    ) : (
      <Text key={key} text={item.label} />
    );
  };

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container className="p-3" style={{ backgroundColor: '#eee' }}>
        {questionnaire && <Title questionnaire={questionnaire} />}
        <Row>
          <Col>
            {questionnaireItems
              ? Object.values(questionnaireItems).map((item, idx) => {
                  return renderInput(item, idx);
                })
              : null}
          </Col>
        </Row>
      </Container>
    </ExampleContext.Provider>
  );
};
