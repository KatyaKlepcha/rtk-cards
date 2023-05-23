import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { NavLink, useNavigate } from "react-router-dom";
import { authThunks } from "features/auth/auth-reducer";
import { useActions } from "app/hooks/useActions";
import List from "common/components/List/List";
import CommonButton from "common/components/Button/CommonButton";
import style from "features/auth/login/Login.module.css";
import EmailInput from "common/components/EmailInput/EmailInput";
import PasswordInput from "common/components/PasswordInput/PasswordInput";
import s from "features/auth/registration/Register.module.css";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { signUp } = useActions(authThunks);
  const navigate = useNavigate();

  const {
    register, //позволяет регистрировать различные поля для формы
    watch,
    formState: { errors, isValid },
    setError,
    handleSubmit, //обертка над нашим кастомным хэндлером отправки формы. позволяет сделать то, что например связано с валидацией
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    signUp(values)
      .unwrap()
      .then(() => {
        navigate("/login");
      });
    if (!errors) reset();
  };

  const validate = (val: string) => {
    if (watch("password") !== val) {
      return "Your passwords do no match";
    }
  };

  return (
    <List title={"Sign Up"}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <EmailInput name={"email"} label="Email:" register={register} error={errors.email?.message} />
        <PasswordInput name={"password"} label="Password:" register={register} error={errors.password?.message} />
        <PasswordInput
          name={"confirmPassword"}
          label="Confirm password:"
          register={register}
          error={errors.confirmPassword?.message}
          validate={validate}
        />
        <CommonButton variant={"contained"} title={"Sign Up"} className={s.signUpButton} disabled={!isValid} />
        <div className={style.signUp}>
          <div className={s.haveAccount}>Already have an account?</div>
          <NavLink to={"/login"}>Sign In</NavLink>
        </div>
      </form>
    </List>
  );
};

export default Register;
