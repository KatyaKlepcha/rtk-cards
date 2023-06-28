import { RootStateType } from "app/store";

export const selectCardsPacks = (state: RootStateType) => state.packs.packs.cardPacks;
export const selectCardPacksTotalCount = (state: RootStateType) => state.packs.packs.cardPacksTotalCount;
export const selectPage = (state: RootStateType) => state.packs.searchParams.page;
export const selectPageCount = (state: RootStateType) => state.packs.searchParams.pageCount;
export const selectUserId = (state: RootStateType) => state.packs.searchParams.user_id;
export const selectMin = (state: RootStateType) => state.packs.searchParams.min;
export const selectMax = (state: RootStateType) => state.packs.searchParams.max;
export const selectMaxCardsCount = (state: RootStateType) => state.packs.packs.maxCardsCount;
export const selectMinCardsCount = (state: RootStateType) => state.packs.packs.minCardsCount;
export const selectorSortPack = (state: RootStateType) => state.packs.searchParams.sortPacks;
export const selectorPackNameSearch = (state: RootStateType) => state.packs.searchParams.packName;
export const selectIsMy = (state: RootStateType) => state.packs.searchParams.isMy;
