import { Control, Controller, FieldValues, useForm } from "react-hook-form";

const ControllerWithTransformer = <T,>({
  control,
  transform,
  name,
  defaultValue,
}: {
  control: Control<FieldValues, T>;
  transform: {
    input: (value: number) => string;
    output: (e: React.ChangeEvent<HTMLInputElement>) => number;
  };
  name: string;
  defaultValue: string;
}) => (
  <Controller
    defaultValue={defaultValue}
    control={control}
    name={name}
    render={({ field }) => (
      <input
        onChange={(e) => field.onChange(transform.output(e))}
        value={transform.input(field.value)}
        className="bg-slate-100 rounded px-2 py-1 outline-none text-slate-800"
      />
    )}
  />
);

function TransformAndParse() {
  const { control } = useForm();

  return (
    <ControllerWithTransformer
      transform={{
        input: (value) => {
          const v = isNaN(value) || value === 0 ? "" : value.toString();
          console.log("TYPE OF INPUT:", typeof v);
          return v;
        },

        output: (e) => {
          const output = parseInt(e.target.value, 10);
          const v = isNaN(output) ? 0 : output;
          console.log("TYPE OF OUTPUT:", typeof v);
          return v;
        },
      }}
      control={control}
      name="stringToNumber"
      defaultValue=""
    />
  );
}

export default TransformAndParse;
