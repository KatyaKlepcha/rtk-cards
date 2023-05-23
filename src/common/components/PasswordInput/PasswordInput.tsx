import React, { useState } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import s from "./PasswordInput.module.css";
import eye from "../../../common/images/Shape.svg";
import cn from "classnames";

type InputPropsType<IFormValues extends FieldValues> = {
  label: string;
  name: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  // type?: string;
  // rules?: RegisterOptions;
  error?: any;
  required?: boolean;
  validate?: any;
};

const PasswordInput = <IFormValues extends Record<string, unknown>>({
  label,
  register,
  name,
  required,
  error,
  validate,
}: InputPropsType<IFormValues>) => {
  const [hideIcon, setHideIcon] = useState(true);

  const onChangeIcon = () => {
    setHideIcon(!hideIcon);
  };

  return (
    <>
      <label>{label}</label>
      <div className={s.wrapper}>
        <input
          {...(register &&
            register(name, {
              required: "Password is required",
              minLength: {
                value: 7,
                message: "Must be 7 characters or more",
              },
              validate,
            }))}
          name={name}
          type={hideIcon ? "password" : "text"}
          className={s.input}
        />
        <div className={cn({ [s.openPassword]: !hideIcon }, s.hidePassword)} onClick={onChangeIcon}>
          <img className={s.iconEye} src={eye} alt={"iconEye"} />
        </div>
      </div>
      {error && <div className={s.errorText}>{error || "Error"}</div>}
    </>
  );
};

export default PasswordInput;
