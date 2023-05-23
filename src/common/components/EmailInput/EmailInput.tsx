import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import s from "common/components/EmailInput/EmailInput.module.css";

type InputPropsType<FormValues extends FieldValues> = {
  label: string;
  name: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  // rules?: any;
  error?: any;
  required?: boolean;
};

const EmailInput = <FormValues extends Record<string, unknown>>({
  label,
  name,
  register,
  error,
}: InputPropsType<FormValues>) => {
  const emailValidation = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "Enter a valid email address.",
  };

  return (
    <>
      <label>{label}</label>
      <input {...register(name, { required: "Email is required", pattern: emailValidation })} />
      {error && <div className={s.errorText}>{error || "Error"}</div>}
    </>
  );
};

export default EmailInput;
