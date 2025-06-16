import { FieldError, FieldValues, UseControllerProps } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  error: FieldError | undefined;
  name: string;
} & UseControllerProps<T>;

function FormFieldPhoneNumber<T extends FieldValues>({
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
      <PhoneInputWithCountry
        id={label.toLowerCase().split(" ").join("-")}
        name={name}
        control={control}
        defaultCountry="NL"
        countrySelectProps={{
          className: "rounded px-2 py-1 outline-none",
        }}
        numberInputProps={{
          className:
            "bg-slate-100 rounded px-2 py-1 outline-none text-slate-800",
        }}
      />
      {error && (
        <p role="alert" className="text-red-400 py-1">
          {error.message}
        </p>
      )}
    </section>
  );
}

export default FormFieldPhoneNumber;
