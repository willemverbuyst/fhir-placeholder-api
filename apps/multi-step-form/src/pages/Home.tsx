import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { MULTI, ROUTES } from "../constants";

function Start() {
  const navigate = useNavigate();

  function goToMultiStepForm() {
    navigate(`/${ROUTES.MULTI}/${MULTI.START}`);
  }

  return (
    <section className="w-66 flex py-4 gap-2">
      <Button caption="Multi Step Form" handleClick={goToMultiStepForm} />
    </section>
  );
}

export default Start;
