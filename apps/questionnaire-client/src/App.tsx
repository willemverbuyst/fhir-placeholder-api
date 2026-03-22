import { Model, StylesManager } from "survey-core";
import "survey-core/defaultV2.min.css";
import { Survey } from "survey-react-ui";
import { useAppState } from "./state";

StylesManager.applyTheme("defaultV2");

function App() {
  const { countries, questionnaire, isLoading, user } = useAppState();
  const surveyJson = questionnaire;
  const survey = surveyJson && new Model(surveyJson);

  survey?.setVariable("user", user);
  const question = survey?.getQuestionByName("2.3");
  question?.setPropertyValue("choices", countries);

  return isLoading ? (
    <p>...loading</p>
  ) : survey ? (
    <div style={{ width: "80vw" }}>
      <Survey model={survey} />
    </div>
  ) : (
    <p>no questionnaire</p>
  );
}

export default App;
