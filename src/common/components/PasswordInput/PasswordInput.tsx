import React, { useState } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import s from "./PasswordInput.module.css";
import eye from "../../../common/images/Shape.svg";
import cn from "classnames";

type InputPropsType<IFormValues extends FieldValues> = {
  label: string;
  name: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  type?: string;
  rules?: RegisterOptions;
  error?: any;
};

const PasswordInput = <IFormValues extends Record<string, unknown>>({
  label,
  register,
  name,
  type,
  rules,
  error,
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
          {...(register && register(name, rules))}
          name={name}
          type={hideIcon ? "password" : "text"}
          className={s.input}
        />
        <div className={cn({ [s.openPassword]: !hideIcon }, s.hidePassword)} onClick={onChangeIcon}>
          {/*<div className={cn({!hideIcon: 's.openPassword' }, 's.hidePassword')} onClick={onChangeIcon}>*/}
          <img className={s.iconEye} src={eye} alt={"iconEye"} />
        </div>
      </div>
      {error && <div className={s.errorText}>{error || "Error"}</div>}
    </>
  );
};

export default PasswordInput;
