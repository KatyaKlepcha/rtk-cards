import { appActions } from "app/app-reducer";
import { AppDispatch, RootStateType } from "app/store";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { isAxiosError, AxiosError } from "axios";

// export const thunkTryCatch = async (
//   //возвращает результат выполнения logic
//   thunkAPI: BaseThunkAPI<RootStateType, any, AppDispatch, unknown>,
//   logic: Function //Функция logic - это функция, которую мы хотим выполнить с помощью try-catch. Мы использовали анонимную функцию внутри thunkTryCatch для выполнения logic
// ) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     return await logic();
//   } catch (e: any) {
//     const error = e.response ? e.response.data.error : e.message;
//     dispatch(appActions.setAppError({ error }));
//     return rejectWithValue(null);
//   }
// };

/**
 * Функция thunkTryCatch возвращает результат выполнения logic
 * Функция logic - это функция, которую мы хотим выполнить с помощью try-catch.
 * Если во время выполнения logic произошла ошибка, мы обрабатываем ее в блоке catch. Затем мы заканчиваем выполнение thunkTryCatch
 */

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootStateType, any, AppDispatch, null | { err: Error; showGlobalError: boolean }>,
  logic: Function,
  showGlobalError: boolean = true,
  finallyCallback?: Function
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    return await logic();
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    if (isAxiosError(err)) {
      const error = err.response ? err.response.data.error : err.message;
      dispatch(appActions.setAppError({ error }));
    } else {
      dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
    }
    return rejectWithValue({ err, showGlobalError });
  } finally {
    finallyCallback && finallyCallback();
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
