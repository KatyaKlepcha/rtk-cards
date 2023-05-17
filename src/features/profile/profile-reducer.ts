import { createSlice } from "@reduxjs/toolkit";
import { ProfileType } from "features/auth/auth-api";
import { createAppAsyncThunk } from "common/utils/create -app-async-thunk";
import { AxiosError } from "axios/index";
import { ChangeProfileType, profileApi } from "features/profile/profile-api";
import { appActions } from "app/app-reducer";

const getProfile = createAppAsyncThunk<{ profile: ProfileType }, void>("profile/getProfile", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  const res = await profileApi.getProfile();
  try {
    console.log("res.data", res.data);
    return { profile: res.data };
  } catch (e: any) {
    const error = e as AxiosError;

    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
});

const changeProfile = createAppAsyncThunk<{ profile: ProfileType }, ChangeProfileType>(
  "profile/changeProfile",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await profileApi.changeProfile(arg);
    try {
      console.log("changeProfile", res.data.updatedUser);
      return { profile: res.data.updatedUser };
    } catch (e: any) {
      const error = e as AxiosError;

      return rejectWithValue(null);
    } finally {
      dispatch(appActions.setAppStatus({ status: "idle" }));
    }
  }
);

const slice = createSlice({
  name: "profile",
  initialState: {
    profile: null as null | ProfileType,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(changeProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      });
  },
});

export const profileReducer = slice.reducer;
export const profileThunks = { getProfile, changeProfile };
