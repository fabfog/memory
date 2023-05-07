import {
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";

export interface ControlledSelectOption {
  value: string;
  label: ReactNode | string;
  options?: Partial<
    DetailedHTMLProps<HTMLAttributes<HTMLOptionElement>, HTMLOptionElement>
  >;
}

export interface ControlledSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: ControlledSelectOption[];
  inputProps?: Partial<
    DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
  > &
    InputHTMLAttributes<HTMLInputElement>;
  controllerProps?: Omit<
    Partial<ControllerProps<T>>,
    "name" | "render" | "control"
  >;
}

export function ControlledSelect<T extends FieldValues>({
  control,
  label,
  name,
  options,
  inputProps,
  controllerProps,
}: ControlledSelectProps<T>) {
  return (
    <Controller
      {...controllerProps}
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="form-control text-md">
          <label className="input-group">
            <span className="uppercase">{label}</span>
            <select
              className="select select-lg select-primary text-md"
              {...field}
              {...inputProps}
            >
              {options.map(({ value, label, options }) => (
                <option key={value} {...options}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            <span className="label-text-alt">{error?.message}</span>
          </label>
        </div>
      )}
    />
  );
}
