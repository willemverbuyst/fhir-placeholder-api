import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getLabel } from '../business/label';
import {
  FlatQuestionnaire,
  Item,
  Questionnaire,
} from '../interfaces/questionnaire';
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

  let orgGroupId = '';

  const renderInput = (item: Item, idx: number) => {
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
      <TypeChoice key={key} item={item} questionnaire={questionnaire} />
    ) : (
      <Text key={key} text={getLabel(item)} />
    );
  };

  const renderSpace = (item: Item, groupId: string, idx: number) => {
    const diffId = groupId && groupId !== orgGroupId;
    if (diffId) {
      orgGroupId = groupId;
    }
    return diffId ? (
      <>
        <br />
        {renderInput(item, idx)}
      </>
    ) : (
      <>{renderInput(item, idx)}</>
    );
  };

  return (
    <ExampleContext.Provider value={questionnaire}>
      <Container className="p-3" style={{ backgroundColor: '#eee' }}>
        {questionnaire && <Title questionnaire={questionnaire} />}
        <Row>
          <Col>
            {questionnaireItems
              ? Object.values(questionnaireItems).map(
                  ({ item, meta: { groupId } }, idx) => {
                    // return renderInput(item);
                    return renderSpace(item, groupId, idx);
                  }
                )
              : null}
          </Col>
        </Row>
      </Container>
    </ExampleContext.Provider>
  );
};
