import { RootStateType } from "app/store";

export const selectEmail = (state: RootStateType) => state.profile.profile?.email;
export const selectName = (state: RootStateType) => state.profile.profile?.name;
export const selectProfileId = (state: RootStateType) => state.profile.profile?._id;
// export const selectProfile = (state: RootStateType)=> state.profile.profile?.
