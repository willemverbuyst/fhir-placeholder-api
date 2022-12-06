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
  const questionnaireItems = questionnaire?.item;

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container className="p-3" style={{ backgroundColor: '#eee' }}>
        {questionnaire && <Title questionnaire={questionnaire} />}
        <Row>
          <Col>
            {questionnaireItems
              ? Object.values(questionnaireItems).map(({ item }, idx) =>
                  item?.type === 'boolean' ? (
                    <TypeBoolean key={item?.linkId || idx} item={item} />
                  ) : item?.type === 'string' ? (
                    <TypeString key={item?.linkId || idx} item={item} />
                  ) : item?.type === 'integer' ? (
                    <TypeInteger key={item?.linkId || idx} item={item} />
                  ) : item?.type === 'date' ? (
                    <TypeDate key={item?.linkId || idx} item={item} />
                  ) : item?.type === 'dateTime' ? (
                    <TypeDateTime key={item?.linkId || idx} item={item} />
                  ) : item?.type === 'group' ? (
                    <TypeGroup key={item?.linkId || idx} item={item} />
                  ) : item?.type === 'decimal' ? (
                    <TypeDecimal key={item?.linkId || idx} item={item} />
                  ) : item?.type === 'choice' ? (
                    <TypeChoice
                      key={item?.linkId || idx}
                      item={item}
                      questionnaire={questionnaire}
                    />
                  ) : (
                    <Text
                      key={item?.linkId || idx}
                      text={
                        item?.text ||
                        (item?.code && item.code[0].display) ||
                        (item?.code && item.code[0].code) ||
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
