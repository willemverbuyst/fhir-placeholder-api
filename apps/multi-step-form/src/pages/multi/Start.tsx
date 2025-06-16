import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { MULTI, ROUTES } from "../../constants";

function Start() {
  const navigate = useNavigate();

  const startForm = () => {
    navigate(`/${ROUTES.MULTI}/${MULTI.STEP1}`);
  };

  return (
    <section className="w-66 flex flex-col py-4">
      <Button caption="Start" handleClick={startForm} />
    </section>
  );
}

export default Start;
