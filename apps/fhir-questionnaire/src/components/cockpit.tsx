import { Questionnaire } from "fhir/r4";
import React, { useContext, useState } from "react";
import {
  ButtonGroup,
  Col,
  Container,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { main } from "../business";
import { examples } from "../examples";
import { ActionTypes } from "../store/actions";
import { AppContext } from "../store/context";
import { Form } from "./form/form";

export const Cockpit = React.memo(() => {
  const [checked, setChecked] = useState<string>();
  const { state, dispatch } = useContext(AppContext);

  const handleChange = (e: React.ChangeEvent<HTMLElement>, idx: number) => {
    setChecked(e.currentTarget.id);
    //  todo: validate
    const example = examples[idx] as Questionnaire;
    const qFlat = main(example);
    dispatch({ type: ActionTypes.SetQuestionnaire, payload: qFlat });
  };

  return (
    <>
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
      {state.questionnaire && <Form />}
    </>
  );
});
