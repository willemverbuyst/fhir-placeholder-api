import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  error: FieldError | undefined;
  name: string;
} & UseControllerProps<T>;

function FormFieldDatePicker<T extends FieldValues>({
  label,
  error,
  control,
  name,
}: Props<T>) {
  return (
    <section className="flex flex-col py-4">
      <label
        htmlFor={label.toLowerCase().split(" ").join("-")}
        className="py-1"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            wrapperClassName="bg-slate-100 rounded px-2 py-1 outline-none text-slate-800"
            onChange={onChange}
            selected={value}
          />
        )}
      />
      {error && (
        <p role="alert" className="text-red-400 py-1">
          {error.message}
        </p>
      )}
    </section>
  );
}

export default FormFieldDatePicker;
