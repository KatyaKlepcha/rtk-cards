import { RootStateType } from "app/store";

export const selectEmail = (state: RootStateType) => state.profile.profile?.email;
export const selectName = (state: RootStateType) => state.profile.profile?.name;
