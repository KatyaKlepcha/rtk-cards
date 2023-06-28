import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { authReducer } from "features/auth/auth-reducer";
import { appReducer } from "app/app-reducer";
import { profileReducer } from "features/profile/profile-reducer";
import { packsReducer } from "features/packs/packs-reducer";
import { cardsReducer } from "../features/cards/cards-reducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, Action<string>>;
