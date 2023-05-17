import React from "react";
import List from "common/components/List/List";
import s from "./NewPassword.module.css";
import CommonButton from "common/components/Button/CommonButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useActions } from "app/hooks/useActions";
import { authThunks } from "features/auth/auth-reducer";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsForgotPassword } from "features/auth/forgotPassword/forgotPassword-selector";
import PasswordInput from "common/components/PasswordInput/PasswordInput";

type FormValues = {
  password: string;
};

const NewPassword = () => {
  const forgotPassword = useSelector(selectIsForgotPassword);
  const { setNewPassword } = useActions(authThunks);
  let { token } = useParams();

  const {
    register, //позволяет регистрировать различные поля для формы
    formState: { errors, isValid },
    setError,
    handleSubmit, //обертка над нашим кастомным хэндлером отправки формы. позволяет сделать то, что например связано с валидацией
    // reset
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const password = values.password;
    // alert(JSON.stringify(data))
    token && setNewPassword({ password, resetPasswordToken: token });
  };

  if (forgotPassword) {
    return <Navigate to={"/login"} />;
  }
  return (
    <List title={"Create new password"}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <PasswordInput name={"password"} label="Password:" register={register} />
        <div className={s.text}> Create new password and we will send you further instructions to email</div>
        <CommonButton title={"Create new password"} variant={"contained"} />
      </form>
    </List>
  );
};

export default NewPassword;
