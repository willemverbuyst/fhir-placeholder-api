import { UseFormRegisterReturn } from "react-hook-form";

type Props<T extends string> = {
  label: string;
  formRegister: UseFormRegisterReturn<T>;
};

function FormFieldCheckbox<T extends string>({
  label,
  formRegister,
}: Props<T>) {
  return (
    <section className="flex py-4 gap-2">
      <input
        id={label.toLowerCase().split(" ").join("-")}
        {...formRegister}
        type="checkbox"
        className="bg-slate-100 rounded px-2 py-1 outline-none"
      />
      <label
        htmlFor={label.toLowerCase().split(" ").join("-")}
        className="py-1"
      >
        {label}
      </label>
    </section>
  );
}

export default FormFieldCheckbox;
