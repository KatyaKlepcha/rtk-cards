import React, { useEffect } from "react";
import HeaderPacks from "features/packs/headerPacks/HeaderPacks";
import s from "./Packs.module.css";
import PacksList from "features/packList/PacksList";
import { useActions } from "app/hooks/useActions";
import { packsThunks } from "features/packs/packs-reducer";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import {
  selectCardPacksTotalCount,
  selectCardsPacks,
  selectMax,
  selectMin,
  selectorPackNameSearch,
  selectorSortPack,
  selectPage,
  selectPageCount,
  selectUserId,
} from "./packs-selectors";
import { selectIsInitialized } from "../../app/app-selector";

const Packs = () => {
  const { getPacks } = useActions(packsThunks);
  const page = useAppSelector(selectPage);
  const pageCount = useAppSelector(selectPageCount);
  const packs = useAppSelector(selectCardsPacks);
  const totalCount = useAppSelector(selectCardPacksTotalCount);
  const user_id = useAppSelector(selectUserId);
  const min = useAppSelector(selectMin);
  const max = useAppSelector(selectMax);
  const sortPack = useAppSelector(selectorSortPack);
  const packName = useAppSelector(selectorPackNameSearch);
  const isInitialized = useAppSelector(selectIsInitialized);

  // const cardName = useAppSelector(selectPackName);

  useEffect(() => {
    if (isInitialized) {
      getPacks({ user_id });
    }
  }, [page, pageCount, user_id, min, max, sortPack, packName, isInitialized]);

  return (
    <div className={s.container}>
      <HeaderPacks />
      <PacksList page={page} pageCount={pageCount} packs={packs} totalCount={totalCount} />
    </div>
  );
};

export default Packs;
