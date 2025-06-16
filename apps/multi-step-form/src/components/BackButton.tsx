import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return <Button caption="Back" handleClick={handleGoBack} />;
}

export default BackButton;
