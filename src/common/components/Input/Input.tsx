import React from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import s from "./Input.module.css";

type InputPropsType<IFormValues extends FieldValues> = {
  label: string;
  name: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  type?: string;
  rules?: RegisterOptions;
  error?: any;
};

const Input = <IFormValues extends Record<string, unknown>>({
  label,
  register,
  name,
  type,
  rules,
  error,
}: InputPropsType<IFormValues>) => {
  return (
    <>
      <label>{label}</label>
      <input {...(register && register(name, rules))} name={name} type={type} />
      {error && <div className={s.errorText}>{error || "Error"}</div>}
    </>
  );
};

export default Input;
