import { RootStateType } from "app/store";

export const selectIsSignUp = (state: RootStateType) => state.auth.isSignUp;
export const selectIsLoggedIn = (state: RootStateType) => state.auth.isLoggedIn;
