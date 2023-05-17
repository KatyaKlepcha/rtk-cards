import React, { FC } from "react";
import { Button } from "@mui/material";
import s from "./CommonButton.module.css";
import cn from "classnames";

type PropsType = {
  title: string;
  variant: "text" | "contained" | "outlined";
  className?: string;
  onClickHandler?: () => void;
};

const CommonButton: FC<PropsType> = ({ title, variant, className, onClickHandler }) => {
  return (
    <Button
      sx={{
        borderRadius: 30,
        textTransform: "initial",
      }}
      type={"submit"}
      variant={variant}
      color={"primary"}
      className={cn(className, s.button)}
      onClick={onClickHandler}
    >
      {title}
    </Button>
  );
};

export default CommonButton;
