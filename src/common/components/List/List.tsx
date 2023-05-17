import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import s from "common/components/List/List.module.css";

type PropsType = {
  children: React.ReactNode;
  title: string;
};

const List: FC<PropsType> = ({ children, title }) => {
  return (
    <Paper className={s.paper}>
      <div className={s.container}>
        <h3 className={s.title}>{title}</h3>
        {children}
      </div>
    </Paper>
  );
};

export default List;
