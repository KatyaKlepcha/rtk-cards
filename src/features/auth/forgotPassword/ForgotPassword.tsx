import React from "react";
import List from "common/components/List/List";
import s from "./ForgotPassword.module.css";
import CommonButton from "common/components/Button/CommonButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, NavLink } from "react-router-dom";
import { useActions } from "app/hooks/useActions";
import { selectIsForgotPassword } from "features/auth/forgotPassword/forgotPassword-selector";
import { useSelector } from "react-redux";
import { authThunks } from "features/auth/auth-reducer";
import Input from "common/components/Input/Input";

type FormValues = {
  email: string;
};

const ForgotPassword = () => {
  const isForgotPassword = useSelector(selectIsForgotPassword);

  const { forgotPassword } = useActions(authThunks);

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
    // alert(JSON.stringify(data))
    console.log("values", values);
    forgotPassword(values.email);
  };

  // if (isSignUp) {
  //   return <Navigate to={"/login"} />;
  // }

  if (isForgotPassword) {
    return <Navigate to={"/check-email"} />;
  }

  return (
    <List title={"Forgot your password"}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input name={"email"} label="Email:" register={register} />

        <div className={s.text}> Enter your email address and we will send you further instructions</div>
        <CommonButton title={"Send Instructions"} variant={"contained"} />
        <div className={s.rememberPassword}>
          <div>Did you remember your password?</div>
          <NavLink to={"/login"}>Try logging in</NavLink>
        </div>
      </form>
    </List>
  );
};

export default ForgotPassword;
