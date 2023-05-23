import { createSlice } from "@reduxjs/toolkit";
import { ProfileType } from "features/auth/auth-api";
import { createAppAsyncThunk } from "common/utils/create -app-async-thunk";
import { ChangeProfileType, profileApi } from "features/profile/profile-api";
import { thunkTryCatch } from "common/utils/thunk-try-catch";

const getProfile = createAppAsyncThunk<{ profile: ProfileType }, void>("profile/getProfile", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  // dispatch(appActions.setAppStatus({ status: "loading" }));
  return thunkTryCatch(thunkAPI, async () => {
    const res = await profileApi.getProfile();
    console.log("res.data", res.data);
    return { profile: res.data };
  });
  // try {
  //   const res = await profileApi.getProfile();
  //   console.log("res.data", res.data);
  //   return { profile: res.data };
  // } catch (e: any) {
  //   const error = e as AxiosError;
  //
  //   return rejectWithValue(null);
  // } finally {
  //   dispatch(appActions.setAppStatus({ status: "idle" }));
  // }
});

const changeProfile = createAppAsyncThunk<{ profile: ProfileType }, ChangeProfileType>(
  "profile/changeProfile",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    // dispatch(appActions.setAppStatus({ status: "loading" }));

    return thunkTryCatch(thunkAPI, async () => {
      const res = await profileApi.changeProfile(arg);
      console.log("changeProfile", res.data.updatedUser);
      return { profile: res.data.updatedUser };
    });

    // try {
    //   const res = await profileApi.changeProfile(arg);
    //   console.log("changeProfile", res.data.updatedUser);
    //   return { profile: res.data.updatedUser };
    // } catch (e: any) {
    //   const error = e as AxiosError;
    //
    //   return rejectWithValue(null);
    // } finally {
    //   dispatch(appActions.setAppStatus({ status: "idle" }));
    // }
  }
);

const changeAvatar = createAppAsyncThunk<{ profile: ProfileType }, File>(
  "profile/changeAvatar",
  async (file, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    // dispatch(appActions.setAppStatus({ status: "loading" }));

    return thunkTryCatch(thunkAPI, async () => {
      const res = await profileApi.saveAvatar(file);
      console.log("changeAvatar", res.data.updatedUser);
      return { profile: res.data.updatedUser };
    });

    // try {
    //   const res = await profileApi.saveAvatar(file);
    //   console.log("changeAvatar", res.data.updatedUser);
    //   return { profile: res.data.updatedUser };
    // } catch (e: any) {
    //   const error = e as AxiosError;
    //
    //   return rejectWithValue(null);
    // } finally {
    //   dispatch(appActions.setAppStatus({ status: "idle" }));
    // }
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
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.profile && (state.profile.avatar = action.payload.profile.avatar);
      });
  },
});

export const profileReducer = slice.reducer;
export const profileThunks = { getProfile, changeProfile, changeAvatar };
