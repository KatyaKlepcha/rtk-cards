import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "features/auth/login/Login.module.css";
import s from "features/auth/registration/Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import List from "common/components/List/List";
import CommonButton from "common/components/Button/CommonButton";
import { useActions } from "app/hooks/useActions";
import { authThunks } from "features/auth/auth-reducer";
import Input from "common/components/Input/Input";
import PasswordInput from "common/components/PasswordInput/PasswordInput";

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const { login } = useActions(authThunks);
  const navigate = useNavigate();

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
    // reset()
    login(values);
    navigate("/profile");
  };

  return (
    <List title={"Sign In"}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input name={"email"} label="Email:" register={register} />
        {/*<div className={s.error}>{errors?.email && <p>{errors?.email?.message || "Error"}</p>}</div>*/}

        <div className={style.inputBlock}>
          {/*    <input*/}
          {/*      placeholder={"Password"}*/}
          {/*      type={hideIcon ? "password" : "text"}*/}
          {/*      {...register("password", {*/}
          {/*        required: "The field is required",*/}
          {/*      })}*/}
          {/*    />*/}
          <PasswordInput name={"password"} label="Password:" register={register} />
        </div>
        {/*</label>*/}
        {/*<div className={s.error}>{errors?.password && <p>{errors?.password?.message || "Error"}</p>}</div>*/}
        <div className={style.checkbox}>
          <Input name={"rememberMe"} label="Remember me" register={register} type={"checkbox"} />
        </div>

        {/*<label className={style.checkbox}>*/}
        {/*  <input type={"checkbox"} {...register("rememberMe")} />*/}
        {/*  Remember me*/}
        {/*</label>*/}
        <CommonButton title={"Sign In"} variant={"contained"} />
        <div className={style.forgotPassword}>
          <NavLink to={"/forgot-password"}>Forgot Password?</NavLink>
        </div>
        <div className={style.signUp}>
          <div>Already have an account?</div>
          <NavLink to={"/register"}>Sign Up</NavLink>
        </div>
      </form>
    </List>
  );
};

export default Login;
