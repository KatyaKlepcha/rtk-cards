import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authThunks } from "../features/auth/auth-reducer";

export type RequestStatusType = "idle" | "loading";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    status: "idle" as RequestStatusType,
    isInitialized: false,
  },
  // reducers состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(authThunks.initializeApp.fulfilled, (state) => {
  //       state.isInitialized = true;
  //     })
  //     .addCase(authThunks.initializeApp.rejected, (state) => {
  //       state.isInitialized = true;
  //     });
  // },
});

// Создаем reducer с помощью slice
export const appReducer = slice.reducer;
export const appActions = slice.actions;
