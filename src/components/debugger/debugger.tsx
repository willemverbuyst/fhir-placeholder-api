import { useContext, useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import { AppContext } from '../../store/context'

import { ConvertedQuestionnaire } from './convertedQuestionnaire'
import { HTML } from './html'
import { OriginalQuestionnaire } from './originalQuestionnaire'

export const Debugger = () => {
  const { questionnaire, showDebugger } = useContext(AppContext).state
  const [showHTML, setShowHTML] = useState<boolean>(false)
  const [showConvertedQuestionnaire, setShowConvertedQuestionnaire] =
    useState<boolean>(true)
  const [showOriginalQuestionnaire, setShowOriginalQuestionnaire] =
    useState<boolean>(false)

  return questionnaire && showDebugger ? (
    <Container
      className="p-3 mt-3"
      style={{ backgroundColor: '#333', color: '#fff' }}
    >
      <h3>DEBUGGER</h3>
      <Row className="m-4">
        <Col className="d-flex justify-content-between">
          <Form.Check
            type="switch"
            checked={showHTML}
            label="HTML"
            onChange={() => setShowHTML(!showHTML)}
          />
          <Form.Check
            type="switch"
            checked={showConvertedQuestionnaire}
            label="CONVERTED QUESTIONNAIRE"
            onChange={() =>
              setShowConvertedQuestionnaire(!showConvertedQuestionnaire)
            }
          />
          <Form.Check
            type="switch"
            checked={showOriginalQuestionnaire}
            label="ORIGINAL QUESTIONNAIRE"
            onChange={() =>
              setShowOriginalQuestionnaire(!showOriginalQuestionnaire)
            }
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {showHTML && <HTML />}
          {showConvertedQuestionnaire && <ConvertedQuestionnaire />}
          {showOriginalQuestionnaire && <OriginalQuestionnaire />}
        </Col>
      </Row>
    </Container>
  ) : null
}
