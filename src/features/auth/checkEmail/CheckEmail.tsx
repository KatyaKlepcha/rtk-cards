import React from "react";
import checkEmail from "../../../common/images/CheckEmail.png";
import List from "common/components/List/List";

import s from "./CheckEmail.module.css";
import CommonButton from "common/components/Button/CommonButton";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/login");
  };

  return (
    <List title={"Check Email"}>
      <img src={checkEmail} className={s.image} />
      <div className={s.sentEmail}>We’ve sent an Email with instructions to example@mail.com</div>
      <CommonButton onClickHandler={onClickHandler} title={"Back to login"} variant={"contained"} />
    </List>
  );
};

export default CheckEmail;
