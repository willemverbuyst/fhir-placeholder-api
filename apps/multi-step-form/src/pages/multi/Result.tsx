import { useStateMachine } from "little-state-machine";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { ROUTES } from "../../constants";
import { resetStore } from "../../state/actions";

function Result() {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ resetStore });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToStart = () => {
    actions.resetStore();
    navigate(ROUTES.HOME);
  };

  return (
    <section>
      <h2 className="text-4xl text-centers">Result</h2>
      <section className="flex flex-col gap-5 py-3">
        <section className="flex justify-between gap-8">
          <p>First Name:</p>
          <p>{state.data.firstName}</p>
        </section>
        <section className="flex justify-between gap-8">
          <p>Last Name:</p>
          <p>{state.data.lastName}</p>
        </section>
        <section className="flex justify-between gap-8">
          <p>BSN:</p>
          <p>{state.data.bsn}</p>
        </section>
        <section className="flex justify-between gap-8">
          <p>Date of Birth:</p>
          <p>{state.data.dateOfBirth?.toDateString()}</p>
        </section>
        <section className="flex justify-between gap-8">
          <p>Email:</p>
          <p>{state.data.email}</p>
        </section>
        <section className="flex justify-between gap-8">
          <p>Phone Number:</p>
          <p>{state.data.phoneNumber}</p>
        </section>
        <section className="flex justify-between gap-8">
          <p>Files:</p>
          <ul>
            {Object.values(state.data.files || {}).map((f, i) => (
              <li key={i} className="text-end">
                {f.name}
              </li>
            ))}
          </ul>
        </section>
        <section className="flex justify-between gap-8">
          <p>Position:</p>
          <p>{state.data.position}</p>
        </section>
        <section className="flex justify-between gap-8">
          <p>Skills:</p>
          <ul>
            {Object.values(state.data.skills)
              .filter((i) => i.value)
              .map((skill, i) => (
                <li key={i} className="text-end">
                  {skill.value}
                </li>
              ))}
          </ul>
        </section>
      </section>
      <section className="py-4 flex justify-end gap-2">
        <Button caption="back" handleClick={handleGoBack} />
        <Button caption="done" handleClick={handleGoToStart} />
      </section>
    </section>
  );
}

export default Result;
