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

  return (
    <div className="w-[350px] sm:w-[900px] mx-auto">
      {organization ? (
        <section className="flex flex-col items-center justify-center gap-4 py-10">
          <h2 className="uppercase text-xl text-center">
            You've created {organization}
          </h2>

          <section className="flex flex-col items-center justify-center gap-4 p-4">
            <button
              className="py-2 px-4 rounded-md text-white w-[350px] sm:w-[300px] text-center cursor-pointer font-bold transition-colors bg-pink-500 hover:bg-pink-600"
              type="button"
              onClick={goToForm}
            >
              CREATE NEW
            </button>
          </section>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center gap-4 py-10">
          <h2 className="uppercase text-xl text-center">Create Organization</h2>
          <form
            id="loginForm"
            className="flex flex-col items-center justify-center gap-4"
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
                className="py-2 px-4 rounded-md text-white w-[350px] sm:w-[300px] text-center cursor-pointer font-bold transition-colors bg-pink-500 hover:bg-pink-600"
                type="submit"
              >
                SUBMIT
              </button>
            </section>
          </form>
        </section>
      )}
    </div>
  );
}
