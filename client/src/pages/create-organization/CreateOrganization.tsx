import type React from "react";
import { useRef, useState } from "react";
import InputField, { type Api } from "../../ui/InputField";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function CreateOrganization() {
  const nameRef = useRef<Api>(null);
  const descriptionRef = useRef<Api>(null);

  const [organization, setOrganization] = useState<string>("");

  function handleSubmit(e: React.FormEvent<LoginFormElement>) {
    e.preventDefault();
    const currentTarget = e.currentTarget;

    const name = currentTarget.elements.name.value;
    const description = currentTarget.elements.description.value;
    const isValid = validate(name, description);

    if (isValid) {
      setOrganization(name);
    }
  }

  function validate(
    name: FormDataEntryValue | null,
    description: FormDataEntryValue | null,
  ) {
    let isValid = true;
    if (
      !description ||
      (typeof description === "string" && !description.trim())
    ) {
      descriptionRef.current?.focus();
      descriptionRef.current?.setError("description is missing");
      isValid = false;
    } else {
      descriptionRef.current?.setError("");
    }
    if (!name || (typeof name === "string" && !name.trim())) {
      nameRef.current?.focus();
      nameRef.current?.setError("name is missing");
      isValid = false;
    } else {
      nameRef.current?.setError("");
    }
    return isValid;
  }

  function goToForm() {
    setOrganization("");
  }

  return organization ? (
    <section
      className={
        "flex flex-col items-center w-[400px] m-auto text-white p-10 rounded-md"
      }
    >
      <h1>You've created {organization}</h1>
      <button
        className="border-2 border-black py-2 px-4 rounded-md"
        type="button"
        onClick={goToForm}
      >
        CREATE NEW
      </button>
    </section>
  ) : (
    <section
      className={
        "flex flex-col items-center w-[400px] m-auto text-white p-10 rounded-md"
      }
    >
      <h1>Create a new organization</h1>
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
        <InputField id="name" label="NAME" type="text" apiRef={nameRef} />
        <InputField
          id="description"
          label="DESCRIPTION"
          type="description"
          apiRef={descriptionRef}
        />

        <section>
          <button
            className="border-2 border-black py-2 px-4 rounded-md"
            type="submit"
          >
            SUBMIT
          </button>
        </section>
      </form>
    </section>
  );
}
