import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import s from "./Checkbox.module.css";

type InputPropsType<FormValues extends FieldValues> = {
  label: string;
  name: Path<FormValues>;
  register: UseFormRegister<FormValues>;
};

const Checkbox = <FormValues extends Record<string, unknown>>({
  label,
  name,
  register,
}: InputPropsType<FormValues>) => {
  return (
    <div className={s.container}>
      <label className={s.labelCheckbox}>{label}</label>
      <input {...register(name)} type={"checkbox"} />
    </div>
  );
};

export default Checkbox;
