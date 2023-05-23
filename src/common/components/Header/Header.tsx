import React from "react";
import CommonButton from "common/components/Button/CommonButton";
import AppBar from "@mui/material/AppBar";
import s from "./Header.module.css";
import { selectIsLoggedIn } from "features/auth/auth-selector";
import { useNavigate } from "react-router-dom";
import Avatar from "common/images/Avatar.jpg";
import { selectName } from "features/profile/profile-selector";
import { useAppSelector } from "app/hooks/useAppSelector";

const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const name = useAppSelector(selectName);
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
      }}
      className={s.header}
    >
      <div className={s.headerWrapper}>
        {!isLoggedIn ? (
          <CommonButton
            onClickHandler={onClickHandler}
            title={"Sign in"}
            variant="contained"
            className={s.headerButton}
          />
        ) : (
          <div className={s.personalInformation}>
            <div className={s.personalName}>{name}</div>
            <img src={Avatar} className={s.avatar} alt={"Avatar"} />
          </div>
        )}
      </div>
    </AppBar>
  );
};

export default Header;
