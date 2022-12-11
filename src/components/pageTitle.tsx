import { useContext } from 'react';
import { Row, Stack, Form } from 'react-bootstrap';
import { AppContext } from '../store';

export const PageTitle = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleDebugDisplay = () => {
    dispatch({ type: 'toggleDebugger', payload: true });
  };
  return (
    <Row style={{ textAlign: 'center' }} className="m-3">
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Questionnaires</h1>
        <span>
          <Form.Check
            type="switch"
            checked={state.showDebugger}
            label="debug mode"
            onChange={handleDebugDisplay}
          />
        </span>
      </Stack>
    </Row>
  );
};
