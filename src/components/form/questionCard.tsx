import React from 'react'
import { Card, Button, Stack } from 'react-bootstrap'
import { Unit } from '../../interfaces/unit'
import { TypeGroup } from '../itemTypes'
import { InputSwitch } from './inputSwitch'

interface Props {
  unit: Unit
  onNext: () => void
  onPrevious: () => void
  displayNext: boolean
  displayPrevious: boolean
}

export const QuestionCard: React.FC<Props> = ({
  unit,
  onNext,
  onPrevious,
  displayNext,
  displayPrevious,
}) => {
  if (!unit) return null
  return (
    <div>
      <Card>
        <Card.Body>
          {unit.groupLabel && <TypeGroup unit={unit} />}
          <InputSwitch unit={unit} />
          <Stack direction="horizontal">
            {displayPrevious ? (
              <Button
                className="m-2"
                variant="outline-primary"
                type="submit"
                onClick={onPrevious}
              >
                Previous
              </Button>
            ) : null}
            {displayNext ? (
              <Button
                className="m-2"
                variant="primary"
                type="submit"
                onClick={onNext}
              >
                Next
              </Button>
            ) : null}
          </Stack>
        </Card.Body>
      </Card>
    </div>
  )
}
