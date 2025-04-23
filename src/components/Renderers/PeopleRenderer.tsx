import React from "react";
import { Person } from "../../interfaces/Person";

export function PeopleRenderer(props: Person): React.JSX.Element {
  const { _id, firstName, age, eyeColor, surname, email } = props;
  return (
    <div className="w-[400px]">
      <div>
        <div className="text-center">
          {firstName} {surname}
        </div>
      </div>
      <div>
        <p>email: {email}</p>
        <p>eye color: {eyeColor}</p>
        <p>age: {age}</p>
      </div>
      <div>id: {_id}</div>
    </div>
  );
}
