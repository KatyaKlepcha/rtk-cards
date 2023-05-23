import { RootStateType } from "app/store";

export const selectIsInitialized = (state: RootStateType) => state.app.isInitialized;
export const selectAppStatus = (state: RootStateType) => state.app.status;
export const selectError = (state: RootStateType) => state.app.error;
