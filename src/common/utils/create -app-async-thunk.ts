import { AppDispatch, RootStateType } from "app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */
// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
// 	state: AppRootStateType
// 	dispatch: AppDispatch
// 	rejectValue: null | ResponseType
// }>()

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootStateType;
  dispatch: AppDispatch;
  rejectValue: null | { err: Error; showGlobalError: boolean };
}>();

export type RejectValueType = {
  data: any;
  showGlobalError: boolean;
};
