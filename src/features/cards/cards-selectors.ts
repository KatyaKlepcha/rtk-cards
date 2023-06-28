import { RootStateType } from "../../app/store";

export const selectCards = (state: RootStateType) => state.cards.cards;
export const selectPackName = (state: RootStateType) => state.cards.packName;
export const selectPage = (state: RootStateType) => state.cards.page;
export const selectPageCount = (state: RootStateType) => state.cards.pageCount;
export const selectCardsTotalCount = (state: RootStateType) => state.cards.cardsTotalCount;
