import { instance } from "common/api/common-api";

export const cardsApi = {
  getCards: (data: CardParamsType) => {
    return instance.get<CardsResponseType>("cards/card", { params: data });
  },
  // addCard: (card: CardType) => {
  //   return instance.post("cards/card", { params: card });
  // },
};

export type CardParamsType = {
  cardAnswer?: string; // не обязательно
  cardQuestion?: string; // не обязательно
  cardsPack_id?: string; // не обязательно
  min?: number; // не обязательно
  max?: number; // не обязательно
  sortCards?: string; // не обязательно
  page?: number; // не обязательно
  pageCount?: number; // не обязательно
};

// export type CardType = {
//   cardsPack_id?: string;
//   question?: string; // если не отправить будет таким "no question"
//   answer?: string; // если не отправить будет таким "no answer"
//   grade?: number; // 0..5, не обязателен
//   shots?: number; // не обязателен
//   answerImg?: string; // не обязателен "url or base 64"
//   questionImg?: string; // не обязателен "url or base 64"
//   questionVideo?: string; // не обязателен
//   answerVideo?: string; // не обязателен
// };

type CardsResponseType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
  packName: string;
};

export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
};
