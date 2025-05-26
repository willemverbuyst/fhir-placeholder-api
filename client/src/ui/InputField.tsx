import {
  type HTMLInputTypeAttribute,
  type RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type Api = {
  focus: () => void;
  setError: (msg: string) => void;
};

function InputField(props: {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  apiRef: RefObject<Api | null>;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    props.apiRef,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      setError: (msg: string) => setErrorMessage(msg),
    }),
    [],
  );

  return (
    <section className="flex flex-col gap-2 items-start w-[350px] sm:w-[600px] lg:w-[900px] p-4">
      <label htmlFor={props.id} className="text-xl">
        {props.label}
      </label>
      <input
        ref={inputRef}
        id={props.id}
        type={props.type}
        className="rounded-md border-2 border-pink-500 bg-white backdrop-blur-md p-2 font-bold text-sky-900 w-full h-[40px] outline-pink-500 focus:outline caret-pink-500"
      />
      <p className="text-pink-500 font-bold">{errorMessage}</p>
    </section>
  );
}

export default InputField;
