import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { AppContext } from '../../store/context'

export const ConvertedQuestionnaire = () => {
  const { questionnaire } = useContext(AppContext).state

  return questionnaire ? (
    <Container
      style={{
        backgroundColor: 'darkorange',
        color: 'black',
        margin: '1rem 0',
        padding: '1rem',
      }}
    >
      <h3>CONVERTED QUESTIONNAIRE</h3>
      <pre>
        {JSON.stringify(
          { units: questionnaire.units, meta: questionnaire.meta },
          null,
          4
        )}
      </pre>
    </Container>
  ) : null
}
