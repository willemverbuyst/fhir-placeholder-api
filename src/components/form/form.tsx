import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AppContext } from '../../store/context'
import { Title } from '../title'
import { QuestionCard } from './questionCard'

export const Form = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const { state } = useContext(AppContext)
  const questionnaire = state.questionnaire
  const questionnaireItems = (questionnaire && questionnaire.units) ?? []

  useEffect(() => {
    setCurrentQuestion(0)
  }, [questionnaire])

  const handleNext = () => {
    if (questionnaire && currentQuestion < questionnaire.units.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <Container className="p-3" style={{ backgroundColor: '#eee' }}>
      {questionnaire ? <Title questionnaire={questionnaire} /> : null}

      <Row>
        <Col>
          {questionnaire && questionnaireItems.length ? (
            <QuestionCard
              unit={Object.values(questionnaireItems)[currentQuestion]}
              onNext={handleNext}
              onPrevious={handlePrevious}
              displayNext={currentQuestion < questionnaire.units.length - 1}
              displayPrevious={currentQuestion > 0}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  )
}
