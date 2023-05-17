import { RootStateType } from "app/store";

export const selectIsForgotPassword = (state: RootStateType) => state.auth.isForgotPassword;
