import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";

export interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  inputProps?: Partial<
    DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>
  > &
    InputHTMLAttributes<HTMLInputElement>;
  controllerProps?: Omit<
    Partial<ControllerProps<T>>,
    "name" | "render" | "control"
  >;
}

export function TextInput<T extends FieldValues>({
  control,
  label,
  name,
  inputProps,
  controllerProps,
}: TextInputProps<T>) {
  return (
    <Controller
      {...controllerProps}
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="form-control">
          <label className="input-group">
            <span className="uppercase">{label}</span>
            <input
              className="input input-bordered input-lg"
              {...field}
              {...inputProps}
            />
          </label>
          <label className="label">
            <span className="label-text-alt">{error?.message}</span>
          </label>
        </div>
      )}
    />
  );
}
