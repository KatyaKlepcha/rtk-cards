import { instance } from "common/api/common-api";

export const packsApi = {
  getPacks: (arg: ArgGetPacksType) => {
    return instance.get<PacksResponseType>("cards/pack", { params: arg });
  },
  deletePacks: (cardId: string) => {
    return instance.delete<ResponseDeletePackType>(`cards/pack?id=${cardId}`);
  },
  addPack(data: AddPackType) {
    return instance.post<ResponseAddPackType>("cards/pack", { cardsPack: data });
  },
  updatePack(data: UpdatePackType) {
    return instance.put<ResponseUpdateType>("cards/pack", data);
  },
};

export type ArgGetPacksType = {
  page?: number;
  pageCount?: number;
  user_id?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  packName?: string;
};

export type PacksResponseType = {
  cardPacks: CardPacksType[];
  cardPacksTotalCount: number;
  // количество колод
  maxCardsCount: number;
  minCardsCount: number;
  page: number; // выбранная страница
  pageCount: number;
  // количество элементов на странице
};

export type CardPacksType = {
  cardsCount: number;
  created: string;
  deckCover: null;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number; //нигде не используется
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};

export type ResponseDeletePackType = {
  deletedCardsPack: CardPacksType;
  token: string;
  tokenDeathTime: string;
};

export type ResponseAddPackType = {
  newCardsPack: CardPacksType;
  token: string;
  tokenDeathTime: string;
};

export type AddPackType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};

export type UpdatePackType = {
  cardsPack: {
    name: string;
    _id: string;
    // deckCover: string;
    // private: boolean;
  };
};

type ResponseUpdateType = {
  updatedCardsPack: CardPacksType;
  token: string;
  tokenDeathTime: number;
};
