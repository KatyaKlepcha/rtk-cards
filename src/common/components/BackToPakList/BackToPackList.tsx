import React from "react";
import s from "./BackToPackList.module.css";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../../../common/images/arrow.svg";
import { PATHS } from "../../routes/PATHS";

const BackToPackList = () => {
  const navigate = useNavigate();

  const onButtonHandler = () => {
    navigate("/packs");
  };

  return (
    <Link className={s.back} to={PATHS.packsList}>
      {/*<div className={s.back} onClick={onButtonHandler}>*/}
      <img src={arrow} alt={"arrow"} className={s.arrowImg} />
      Back to Packs List
      {/*</div>*/}
    </Link>
  );
};

export default BackToPackList;
