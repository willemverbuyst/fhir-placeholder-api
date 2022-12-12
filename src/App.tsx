import { Container } from 'react-bootstrap'
import { Cockpit } from './components/cockpit'
import { Debugger } from './components/debugger/debugger'
import { PageTitle } from './components/pageTitle'
import { AppProvider } from './store/provider'

function App() {
  return (
    <AppProvider>
      <Container style={{ width: '80vw' }}>
        <PageTitle />
        <Cockpit />
        <Debugger />
      </Container>
    </AppProvider>
  )
}

export default App
