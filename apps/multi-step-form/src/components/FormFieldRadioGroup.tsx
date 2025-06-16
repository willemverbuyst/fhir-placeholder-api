import { UseFormRegisterReturn } from "react-hook-form";

type Props<T extends string> = {
  legend: string;
  formRegister: UseFormRegisterReturn<T>;
  values: string[];
};

function FormFieldRadioGroup<T extends string>({
  legend,
  formRegister,
  values,
}: Props<T>) {
  return (
    <fieldset>
      <legend className="text-2xl py-1">{legend}</legend>
      {values.map((value) => (
        <section className="py-1" key={value}>
          <input
            {...formRegister}
            type="radio"
            value={value}
            className="bg-slate-100 rounded outline-none"
            id={value}
          />
          <label className="px-1" htmlFor={value}>
            {value}
          </label>
        </section>
      ))}
    </fieldset>
  );
}

export default FormFieldRadioGroup;
