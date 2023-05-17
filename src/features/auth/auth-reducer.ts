import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create -app-async-thunk";
import { ArgLoginType, ArgRegisterType, authApi, ForgotResponseType, SetNewPasswordType } from "features/auth/auth-api";
import { AxiosError } from "axios";
import { appActions } from "app/app-reducer";
import { profileThunks } from "features/profile/profile-reducer";

const signUp = createAppAsyncThunk<{ isSignUp: boolean }, ArgRegisterType>("auth/signUp", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));

  await authApi.register(arg);
  try {
    return { isSignUp: true };
  } catch (e: any) {
    const error = e as AxiosError;

    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  const res = await authApi.login(arg);

  try {
    dispatch(profileThunks.getProfile());
    return { isLoggedIn: true };
  } catch (e: any) {
    const error = e as AxiosError;

    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  const res = await authApi.logout();
  try {
    return { isLoggedIn: false };
  } catch (e: any) {
    const error = e as AxiosError;

    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    await authApi.me();
    dispatch(profileThunks.getProfile());
    return { isLoggedIn: true };
  } catch (res: any) {
    return rejectWithValue({ data: res.data, showGlobalError: false });
  } finally {
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
});

const forgotPassword = createAppAsyncThunk<{ arg: ForgotResponseType; isForgotPassword: boolean }, string>(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authApi.forgotPassword(email);
      console.log("res", res);
      return { arg: res, isForgotPassword: true };
    } catch (e: any) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(null);
    } finally {
      dispatch(appActions.setAppStatus({ status: "idle" }));
    }
  }
);

const setNewPassword = createAppAsyncThunk<{ arg: ForgotResponseType; isForgotPassword: boolean }, SetNewPasswordType>(
  "auth/setNewPassword",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await authApi.setNewPassword(arg);

    try {
      return { arg: res, isForgotPassword: true };
    } catch (e: any) {
      const error = e as AxiosError;

      return rejectWithValue(null);
    } finally {
      dispatch(appActions.setAppStatus({ status: "idle" }));
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    // profile: null as null | ProfileType,
    isForgotPassword: false,
    isSignUp: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSignUp = action.payload.isSignUp;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        // state.profile = action.payload.profile;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        // state.profile = action.payload.profile;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isForgotPassword = action.payload.isForgotPassword;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.isForgotPassword = action.payload.isForgotPassword;
      });
  },
});

export const authReducer = slice.reducer;
export const authThunks = { signUp, login, logout, initializeApp, forgotPassword, setNewPassword };
