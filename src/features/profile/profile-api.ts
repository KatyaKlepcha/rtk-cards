import { instance } from "common/api/common-api";
import { ProfileType, UpdateUserType } from "features/auth/auth-api";

export const profileApi = {
  getProfile: () => {
    return instance.post<ProfileType>("auth/me");
  },
  changeProfile: (arg: ChangeProfileType) => {
    console.log("API");
    return instance.put<UpdateUserType>("auth/me", arg);
  },
};

export type ChangeProfileType = {
  name?: string;
  avatar?: string;
};
