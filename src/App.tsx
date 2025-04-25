import React, { useRef, useState } from "react";
import "./App.css";
import InputField, { Api } from "./components/InputField";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function App() {
  const usernameRef = useRef<Api>(null);
  const passwordRef = useRef<Api>(null);

  const [loggedInUser, setLoggedInUser] = useState<string>("");

  function handleSubmit(e: React.FormEvent<LoginFormElement>) {
    e.preventDefault();
    const currentTarget = e.currentTarget;

    const username = currentTarget.elements.username.value;
    const password = currentTarget.elements.password.value;
    const isValid = validate(username, password);

    if (isValid) {
      setLoggedInUser(username);
    }
  }

  function validate(
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null
  ) {
    let isValid = true;
    if (!password || (typeof password === "string" && !password.trim())) {
      passwordRef.current?.focus();
      passwordRef.current?.setError("password is missing");
      isValid = false;
    } else {
      passwordRef.current?.setError("");
    }
    if (!username || (typeof username === "string" && !username.trim())) {
      usernameRef.current?.focus();
      usernameRef.current?.setError("username is missing");
      isValid = false;
    } else {
      usernameRef.current?.setError("");
    }
    return isValid;
  }

  function goToForm() {
    setLoggedInUser("");
  }

  return loggedInUser ? (
    <main>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={goToForm}>LOG OUT</button>
    </main>
  ) : (
    <main>
      <h1>Login</h1>
      <form
        id="loginForm"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <InputField
          id="username"
          label="USERNAME"
          type="text"
          apiRef={usernameRef}
        />
        <InputField
          id="password"
          label="PASSWORD"
          type="password"
          apiRef={passwordRef}
        />

        <section>
          <button type="submit">SUBMIT</button>
        </section>
      </form>
    </main>
  );
}

export default App;
