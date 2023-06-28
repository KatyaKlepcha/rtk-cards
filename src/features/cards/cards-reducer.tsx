import { createAppAsyncThunk } from "../../common/utils/create -app-async-thunk";
import { AddPackType, packsApi, ResponseAddPackType } from "../packs/packs-api";
import { thunkTryCatch } from "../../common/utils/thunk-try-catch";
import { CardParamsType, cardsApi, CardType } from "./cards-api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  cards: any;
  cardsTotalCount: number;
  page: number;
  pageCount: number;
  packUserId: string;
  packName: string;
  question: string;
};

const initialState: InitialStateType = {
  cards: [],
  cardsTotalCount: 0,
  page: 1,
  pageCount: 4,
  packUserId: "",
  packName: "",
  question: "",
};

const getCards = createAppAsyncThunk<any, CardParamsType>("cards/getCards", async (arg, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await cardsApi.getCards(arg);
    console.log("res.getCard", res.data);
    return res.data;
  });
});

const addCard = createAppAsyncThunk<any, CardType>("cards/addCard", async (arg, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    // const res = await cardsApi.addCard(arg);
    // console.log("res.addCard", res.data);
    // return res.data;
  });
});

const slice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCardPage: (state, action: PayloadAction<{ cardPage: number }>) => {
      state.page = action.payload.cardPage;
    },
    setCardPageCount: (state, action: PayloadAction<{ pageCount: number }>) => {
      state.pageCount = action.payload.pageCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload.cards;
        state.cardsTotalCount = action.payload.cardsTotalCount;
        state.packName = action.payload.packName;
        state.page = action.payload.page;
        state.pageCount = action.payload.pageCount;
        state.question = action.payload.question;
        state.packUserId = action.payload.packUserId;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards = action.payload;
      });
  },
});

export const cardsReducer = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = { getCards, addCard };
