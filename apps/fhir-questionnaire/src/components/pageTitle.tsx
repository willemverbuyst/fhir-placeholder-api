import { useContext } from "react";
import { Form, Row, Stack } from "react-bootstrap";
import { ActionTypes } from "../store/actions";
import { AppContext } from "../store/context";

export const PageTitle = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleDebugDisplay = () => {
    dispatch({ type: ActionTypes.ToggleDebugger });
  };
  return (
    <Row style={{ textAlign: "center" }} className="m-3">
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Questionnaires</h1>
        <span>
          <Form.Check
            type="switch"
            checked={state.showDebugger}
            label="debugger"
            onChange={handleDebugDisplay}
          />
        </span>
      </Stack>
    </Row>
  );
};
