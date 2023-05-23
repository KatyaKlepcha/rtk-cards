import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create -app-async-thunk";
import { ArgLoginType, ArgRegisterType, authApi, ForgotResponseType, SetNewPasswordType } from "features/auth/auth-api";
import { appActions } from "app/app-reducer";
import { profileThunks } from "features/profile/profile-reducer";
import { thunkTryCatch } from "common/utils/thunk-try-catch";

const signUp = createAppAsyncThunk<void, ArgRegisterType>("auth/signUp", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg);
  });
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(
    thunkAPI,
    async () => {
      await authApi.login(arg);
      dispatch(profileThunks.getProfile());
      return { isLoggedIn: true };
    },
    false
  );
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.logout();
    return { isLoggedIn: false };
  });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  return thunkTryCatch(
    thunkAPI,
    async () => {
      await authApi.me();
      dispatch(profileThunks.getProfile());
      return { isLoggedIn: true };
    },
    true,
    () => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    }
  );

  // try {
  //   const res = await authApi.me();
  //   dispatch(profileThunks.getProfile());
  //   return { isLoggedIn: true };
  // } catch (e) {
  //   const err = e as Error | AxiosError<{ error: string }>;
  //   if (isAxiosError(err)) {
  //     const error = err.response ? err.response.data.error : err.message;
  //     dispatch(appActions.setAppError({ error }));
  //   } else {
  //     dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
  //   }
  //   return rejectWithValue(null);
  // } finally {
  //   dispatch(appActions.setAppInitialized({ isInitialized: true }));
  //   dispatch(appActions.setAppStatus({ status: "idle" }));
  // }
});

const forgotPassword = createAppAsyncThunk<{ arg: ForgotResponseType; isForgotPassword: boolean }, string>(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.forgotPassword(email);
      return { arg: res, isForgotPassword: true };
    });
  }
);

const setNewPassword = createAppAsyncThunk<{ arg: ForgotResponseType; isForgotPassword: boolean }, SetNewPasswordType>(
  "auth/setNewPassword",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.setNewPassword(arg);
      return { arg: res, isForgotPassword: true };
    });
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isForgotPassword: false,
    isSignUp: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(signUp.fulfilled, (state, action) => {
      //   state.isSignUp = action.payload.isSignUp;
      // })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
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
export const authActions = slice.actions;
export const authThunks = { signUp, login, logout, initializeApp, forgotPassword, setNewPassword };
