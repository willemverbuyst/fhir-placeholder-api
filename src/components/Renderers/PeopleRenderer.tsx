import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Person } from "../../interfaces/Person";

export function PeopleRenderer(props: Person): React.JSX.Element {
  const { _id, firstName, age, eyeColor, surname, email } = props;
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">
          {firstName} {surname}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>email: {email}</p>
        <p>eye color: {eyeColor}</p>
        <p>age: {age}</p>
      </CardContent>
      <CardFooter>id: {_id}</CardFooter>
    </Card>
  );
}
