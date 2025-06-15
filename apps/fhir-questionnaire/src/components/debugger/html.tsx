import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AppContext } from "../../store/context";

export const HTML = () => {
  const { questionnaire } = useContext(AppContext).state;

  return questionnaire?.questionnaire?.text?.div ? (
    <Container
      style={{
        backgroundColor: "darkgreen",
        margin: "1rem 0",
        padding: "1rem",
      }}
    >
      <h3>HTML</h3>
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: todo
        dangerouslySetInnerHTML={{
          __html: questionnaire.questionnaire.text?.div,
        }}
      />
    </Container>
  ) : null;
};
