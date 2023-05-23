import { instance } from "common/api/common-api";
import axios from "axios";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg);
  },
  logout: () => {
    return instance.delete("auth/me");
  },
  me: () => {
    return instance.post<ProfileType>("auth/me");
  },
  forgotPassword: (email: string) => {
    const forgot = {
      email, // кому восстанавливать пароль
      from: "test-front-admin <ai73a@yandex.by>",
      // можно указать разработчика фронта)
      message: `<div style="background-color: lime; padding: 15px">
        password recovery link: 
        <a href='http://localhost:3000/#/set-new-password/$token$'>
        link</a>
        </div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    };
    return axios
      .post<ForgotResponseType>("https://neko-back.herokuapp.com/2.0/auth/forgot", forgot)
      .then((res) => res.data);
  },
  setNewPassword: (arg: SetNewPasswordType) => {
    return axios
      .post<ForgotResponseType>("https://neko-back.herokuapp.com/2.0/auth/set-new-password", arg)
      .then((res) => res.data);
  },
};

export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">;

export type RegisterResponseType = {
  //возвращаемый тип
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">;
};

export type UpdateUserType = {
  token: string;
  tokenDeathTime: number;
  updatedUser: ProfileType;
};

export type ProfileType = {
  avatar: File;
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};

export type ForgotPasswordType = {
  email: string;
  from?: string;
  message: string; // хтмп-письмо, вместо $token$ бэк вставит токен
};

export type ForgotResponseType = {
  info: string;
  error?: string;
};

export type SetNewPasswordType = {
  password: string;
  resetPasswordToken: string;
};
