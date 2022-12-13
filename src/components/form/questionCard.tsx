import React from 'react'
import { Card, Button, Stack } from 'react-bootstrap'
import { Unit } from '../../interfaces/unit'
import { TypeGroup } from '../itemTypes'
import { InputSwitch } from './inputSwitch'

interface Props {
  item: Unit
  onNext: () => void
  onPrevious: () => void
  displayNext: boolean
  displayPrevious: boolean
}

export const QuestionCard: React.FC<Props> = ({
  item,
  onNext,
  onPrevious,
  displayNext,
  displayPrevious,
}) => {
  if (!item) return null
  return (
    <div>
      <Card>
        <Card.Body>
          {item.groupLabel && <TypeGroup item={item} />}
          <InputSwitch item={item} />
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
