import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Cockpit } from './components/cockpit';
import { DebugContainer } from './components/debug';
import { PageTitle } from './components/pageTitle';

import { AppProvider, AppContext } from './store';

function App() {
  const { state } = useContext(AppContext);

  return (
    <AppProvider>
      <Container style={{ width: '80vw' }}>
        <PageTitle />
        <Cockpit />
        <DebugContainer />
      </Container>
    </AppProvider>
  );
}

export default App;
