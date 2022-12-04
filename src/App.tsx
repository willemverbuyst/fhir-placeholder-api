import { Container, Row } from 'react-bootstrap';
import { ButtonRow } from './components/buttonRow';

function App() {
  return (
    <Container>
      <Row style={{ textAlign: 'center' }} className="m-3">
        <h1>Questionnaires</h1>
      </Row>
      <ButtonRow />
    </Container>
  );
}

export default App;
