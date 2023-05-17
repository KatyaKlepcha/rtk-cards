import React, { useEffect } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "common/components/Header/Header";
import { useAppSelector } from "app/hooks/hooks";
import { selectAppStatus, selectIsInitialized } from "app/app-selector";
import { useActions } from "app/hooks/useActions";
import { authThunks } from "features/auth/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const status = useAppSelector(selectAppStatus);

  const isInitialized = useAppSelector(selectIsInitialized);

  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp({});
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      {status === "loading" && (
        <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
          <CircularProgress />
        </div>
      )}
      <Header />
      <Outlet />
      {/*{status === "loading" && <LinearProgress />}*/}
    </div>
  );
}

export default App;
