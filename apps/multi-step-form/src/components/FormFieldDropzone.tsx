import { ChangeEventHandler } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

function Dropzone({
  multiple,
  onChange,
  ...rest
}: {
  multiple?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    ...rest,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ onChange })} />
      <p>Drop your files here ...</p>
      <p>or click to select a file</p>
    </div>
  );
}

function FormFieldDropzone<T extends FieldValues>({
  name,
  multiple,
  control,
  ...rest
}: {
  name: string;
  multiple?: boolean;
} & UseControllerProps<T>) {
  return (
    <section className="bg-slate-100 rounded px-2 py-1 outline-none text-slate-800">
      <Controller
        render={({ field: { onChange } }) => (
          <Dropzone
            multiple={multiple}
            onChange={(e) =>
              onChange(multiple ? e.target.files : e.target.files?.[0] ?? null)
            }
            {...rest}
          />
        )}
        name={name}
        control={control}
      />
    </section>
  );
}

export default FormFieldDropzone;
