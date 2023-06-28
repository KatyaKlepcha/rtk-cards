import React from "react";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import style from "features/auth/login/Login.module.css";
import s from "features/auth/registration/Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import List from "common/components/List/List";
import CommonButton from "common/components/Button/CommonButton";
import { useActions } from "app/hooks/useActions";
import { authThunks } from "features/auth/auth-reducer";
import EmailInput from "common/components/EmailInput/EmailInput";
import PasswordInput from "common/components/PasswordInput/PasswordInput";
import Checkbox from "common/components/Checkbox/Checkbox";
import { toast } from "react-toastify";

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
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    login(values)
      .unwrap()
      .then(() => {
        toast.success("You are successfully logged in");
        navigate("/packs");
      })
      .catch((err) => {
        toast.error(err.e.response.data.error);
      });

    if (isValid) {
      reset();
    }
  };

  return (
    <List title={"Sign In"}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <EmailInput label="Email" name={"email"} register={register} error={errors.email?.message} />

        <div className={style.inputBlock}>
          <PasswordInput label="Password:" name={"password"} register={register} error={errors.password?.message} />
        </div>
        <Checkbox label={"Remember me"} name={"rememberMe"} register={register} />

        <div className={style.forgotPassword}>
          <NavLink to={"/forgot-password"}>Forgot Password?</NavLink>
        </div>
        <CommonButton title={"Sign In"} variant={"contained"} className={style.signInButton} disabled={!isValid} />
        <div className={style.signUp}>
          <div>Already have an account?</div>
          <NavLink to="/register">Sign Up</NavLink>
        </div>
      </form>
    </List>
  );
};

export default Login;
