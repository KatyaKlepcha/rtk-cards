import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create -app-async-thunk'
import { thunkTryCatch } from 'common/utils/thunk-try-catch'
import { AddPackType, ArgGetPacksType, packsApi, PacksResponseType, ResponseAddPackType } from './packs-api'
import { RootStateType } from '../../app/store'

type TSearch = {
  sortPacks?: string
  packName?: string
  min?: number
  max?: number
  page?: number
  pageCount?: number
  user_id?: string
  isMy?: boolean
}

type InitialStateType = {
  packs: PacksResponseType
  searchParams: TSearch
}

const initialState: InitialStateType = {
  packs: {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
  },
  searchParams: {
    sortPacks: '0updated',
    packName: '',
    min: 0,
    max: 0,
    page: 1,
    pageCount: 4,
    user_id: '',
    isMy: false,
  },
}

const getPacks = createAppAsyncThunk<PacksResponseType, ArgGetPacksType>('packs/getPacks', async (arg, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const searchParams = getState().packs.searchParams

    const res = await packsApi.getPacks({ ...searchParams, ...arg })
    return res.data
  })

  // return thunkTryCatch(thunkAPI, async () => {
  //   const res = await profileApi.getProfile();
  //   console.log("res.data", res.data);
  //   return { profile: res.data };
  // });
})

const deletePacks = createAppAsyncThunk<{ id: string }, string>('packs/deletePacks', async (id, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.deletePacks(id)
    dispatch(getPacks({}))
    return res.data
  })
})

const addPack = createAppAsyncThunk<ResponseAddPackType, AddPackType>('packs/addPack', async (arg, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.addPack(arg)
    dispatch(getPacks({}))
    return res.data
  })
})

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<TSearch>) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    },
    resetAllSettings: (state, action: PayloadAction<{ max: number }>) => {
      state.searchParams.max = action.payload.max
      state.searchParams.packName = ''
      state.searchParams.user_id = ''
      state.searchParams.min = 0
      state.searchParams.page = 1
      state.searchParams.pageCount = 4
      state.searchParams.isMy = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packs = action.payload
      // state.searchParams = { ...state.searchParams, ...action.payload.arg };
    })
    // .addCase(deletePacks.fulfilled, (state, action) => {
    //   const index = state.packs.cardPacks.findIndex((pack) => pack.user_id === action.payload.id);
    //   if (index !== -1) state.packs.cardPacks.splice(index, 1);
    // });
    // .addCase(addPack.fulfilled, (state, action) => {
    //   state.packs.cardPacks.unshift(action.payload.newCardsPack);
    // });
  },
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks, deletePacks, addPack }
