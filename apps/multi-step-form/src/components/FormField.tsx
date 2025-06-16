import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props<T extends string> = {
  label: string;
  error: FieldError | undefined;
  formRegister: UseFormRegisterReturn<T>;
};

function FormField<T extends string>({ error, label, formRegister }: Props<T>) {
  return (
    <section className="flex flex-col py-4">
      <label
        htmlFor={label.toLowerCase().split(" ").join("-")}
        className="py-1"
      >
        {label}
      </label>
      <input
        id={label.toLowerCase().split(" ").join("-")}
        {...formRegister}
        type="text"
        className="bg-slate-100 rounded px-2 py-1 outline-none text-slate-800"
      />
      {error && (
        <p role="alert" className="text-red-400 py-1">
          {error.message}
        </p>
      )}
    </section>
  );
}

export default FormField;
