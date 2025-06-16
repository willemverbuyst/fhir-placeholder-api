import { UseFormRegisterReturn } from "react-hook-form";

type Props<T extends string> = {
  label?: string;
  formRegister: UseFormRegisterReturn<T>;
  options: { value: string }[];
};

function FormFieldSelect<T extends string>({
  label,
  formRegister,
  options,
}: Props<T>) {
  return (
    <section className="flex flex-col py-1">
      {label && (
        <label htmlFor="label" className="text-2xl">
          {label}
        </label>
      )}
      <select
        {...formRegister}
        id={label}
        className="bg-slate-100 rounded px-2 py-1 outline-none text-slate-800"
      >
        <option value={""}>Select...</option>
        {options.map(({ value }) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </section>
  );
}

export default FormFieldSelect;
