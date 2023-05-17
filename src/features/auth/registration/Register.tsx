import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "features/auth/registration/Register.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { authThunks } from "features/auth/auth-reducer";
import { useActions } from "app/hooks/useActions";
import { useSelector } from "react-redux";
import { selectIsSignUp } from "features/auth/auth-selector";
import List from "common/components/List/List";
import CommonButton from "common/components/Button/CommonButton";
import style from "features/auth/login/Login.module.css";
import Input from "common/components/Input/Input";
import PasswordInput from "common/components/PasswordInput/PasswordInput";

type FormValues = {
  email: string;
  password: string;
};

const Register = () => {
  const { signUp } = useActions(authThunks);
  const isSignUp = useSelector(selectIsSignUp);
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
    signUp(values);
  };

  if (isSignUp) {
    return <Navigate to={"/login"} />;
  }

  return (
    <List title={"Sign Up"}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input name={"email"} label="Email:" register={register} />
        <PasswordInput name={"password"} label="Password:" register={register} />
        <PasswordInput name={"password"} label="Confirm password:" register={register} />
        {/*<div className={s.error}>{errors?.password && <p>{errors?.password?.message || "Error"}</p>}</div>*/}
        {/*<label>*/}
        {/*  Confirm password:*/}
        {/*  <input*/}
        {/*    type={"password"}*/}
        {/*    {...register("password", {*/}
        {/*      required: "The field is required",*/}
        {/*    })}*/}
        {/*  />*/}
        {/*</label>*/}
        <CommonButton variant={"contained"} title={"Sign Up"} className={s.button} />
        <div className={style.signUp}>
          <div className={s.haveAccount}>Already have an account?</div>
          <NavLink to={"/login"}>Sign In</NavLink>
        </div>
      </form>
    </List>
  );
};

export default Register;
