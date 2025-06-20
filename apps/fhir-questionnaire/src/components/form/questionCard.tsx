import React from "react";
import { Button, Card, Stack } from "react-bootstrap";
import type { Unit } from "../../interfaces/unit";
import { TypeGroup } from "../itemTypes";
import { InputSwitch } from "./inputSwitch";

interface Props {
  unit: Unit;
  onNext: () => void;
  onPrevious: () => void;
  displayNext: boolean;
  displayPrevious: boolean;
  subTitle?: string;
}

export const QuestionCard: React.FC<Props> = ({
  unit,
  onNext,
  onPrevious,
  displayNext,
  displayPrevious,
  subTitle,
}) => {
  if (!unit) return null;
  return (
    <div>
      <Card>
        <Card.Body>
          {subTitle && (
            <TypeGroup text={subTitle.toLocaleUpperCase()} color="#aaa" />
          )}
          {unit.groupLabel && <TypeGroup text={unit.groupLabel} />}
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
  );
};
