import { instance } from "common/api/common-api";
import { ProfileType, UpdateUserType } from "features/auth/auth-api";

export const profileApi = {
  getProfile: () => {
    return instance.post<ProfileType>("auth/me");
  },
  changeProfile: (arg: ChangeProfileType) => {
    return instance.put<UpdateUserType>("auth/me", arg);
  },
  saveAvatar(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile); //image - из апишки
    return instance.put("auth/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export type ChangeProfileType = {
  name?: string;
  avatar?: File;
};
