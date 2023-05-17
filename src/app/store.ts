import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "features/auth/auth-reducer";
import { appReducer } from "app/app-reducer";
import { profileReducer } from "features/profile/profile-reducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, Action<string>>;
