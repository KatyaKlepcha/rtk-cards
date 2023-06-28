import React from "react";
import Search from "../../../common/components/search/Search";
import CommonButton from "../../../common/components/Button/CommonButton";
import s from "./CardsHeader.module.css";
import { useAppSelector } from "../../../app/hooks/useAppSelector";
import { selectPackName } from "../cards-selectors";

const CardsHeader = () => {
  const packName = useAppSelector(selectPackName);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.title}>{packName}</div>
        <CommonButton
          title={"Learn to pack"}
          variant={"contained"}
          className={s.learnPackButton}
          // onClickHandler={onAddNewPack}
        />
      </div>

      <Search />
    </div>
  );
};

export default CardsHeader;
