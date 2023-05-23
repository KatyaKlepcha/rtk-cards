import React, { ChangeEvent, useState } from "react";
import List from "common/components/List/List";
import s from "./Profile.module.css";
import CommonButton from "common/components/Button/CommonButton";
import Avatar from "../../common/images/Avatar.jpg";
import EditMode from "../../common/images/EditMode.png";
import arrow from "../../common/images/arrow.svg";
import { useActions } from "app/hooks/useActions";
import { profileThunks } from "features/profile/profile-reducer";
import { authThunks } from "features/auth/auth-reducer";
import { useNavigate } from "react-router-dom";
import { selectEmail, selectName } from "./profile-selector";
import changeAva from "../../common/images/ChangeAvatar.svg";
import { useAppSelector } from "app/hooks/useAppSelector";

const Profile = () => {
  const email = useAppSelector(selectEmail);
  const personName = useAppSelector(selectName);
  const [name, setName] = useState(personName);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { changeProfile, changeAvatar } = useActions(profileThunks);
  const { logout } = useActions(authThunks);
  const navigate = useNavigate();

  const onClickName = () => {
    setEditMode(true);
    setName(personName);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const deActivateEditMode = () => {
    if (name?.trim() !== "") {
      setEditMode(false);
      changeProfile({ name });
    } else {
      setError("Name is required");
    }
  };

  const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.currentTarget.files);
    if (e.currentTarget.files && e.currentTarget.files.length) {
      const avatar = e.currentTarget.files[0];
      changeAvatar(avatar);
    }
  };

  const onLogOut = () => {
    logout({});
    navigate("/login");
  };

  return (
    <div className={s.container}>
      <div className={s.back}>
        <img src={arrow} alt={"arrow"} className={s.arrowImg} />
        Back to Packs List
      </div>
      <List title={"Personal Information"}>
        <div className={s.avatarBlock}>
          <label>
            <img src={Avatar} className={s.avatar} alt={"Avatar"} />
            <img src={changeAva} className={s.changeAvatar} alt={"Change Avatar"}></img>
            <input type={"file"} style={{ display: "none" }} onChange={onAvatarSelected} />
          </label>
        </div>
        <div className={s.information}>
          <div className={s.nameBlock}>
            {!editMode ? (
              <>
                <div className={s.name}>{personName}</div>
                <img src={EditMode} alt={"Button Edit"} onClick={onClickName} />
              </>
            ) : (
              <div className={s.editMode}>
                <label>Nickname</label>
                <input autoFocus value={name} onChange={onChangeName} />
                <CommonButton
                  variant="contained"
                  title={"Save"}
                  onClickHandler={deActivateEditMode}
                  className={s.buttonSave}
                />
                <div className={s.errorName}>{error}</div>
              </div>
            )}
          </div>
          <div className={s.email}>{email}</div>
        </div>
        <div>
          <CommonButton title={"Log out"} variant="outlined" className={s.buttonLogOut} onClickHandler={onLogOut} />
        </div>
      </List>
    </div>
  );
};

export default Profile;
