import React, { useEffect } from "react";

import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "common/components/Header/Header";
import { selectAppStatus, selectIsInitialized } from "app/app-selector";
import { useActions } from "app/hooks/useActions";
import { authThunks } from "features/auth/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import { PreLoader } from "common/components/Preloader/Preloader";
import { useAppSelector } from "app/hooks/useAppSelector";
import { selectIsLoggedIn } from "features/auth/auth-selector";

function App() {
  const status = useAppSelector(selectAppStatus);

  const isInitialized = useAppSelector(selectIsInitialized);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const navigate = useNavigate();

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

  if (isLoggedIn) {
    navigate("/profile");
  }

  return (
    <div className="App">
      {status === "loading" && <PreLoader />}
      <Header />
      <Outlet />
      {/*{status === "loading" && <LinearProgress />}*/}
    </div>
  );
}

export default App;
