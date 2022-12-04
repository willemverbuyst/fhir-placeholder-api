import { Container, Row } from 'react-bootstrap';
import { Cockpit } from './components/cockpit';

function App() {
  return (
    <Container>
      <Row style={{ textAlign: 'center' }} className="m-3">
        <h1>Questionnaires</h1>
      </Row>
      <Cockpit />
    </Container>
  );
}

export default App;
