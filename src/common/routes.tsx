import { createHashRouter } from "react-router-dom";
import ErrorPage from "features/Loginization/ErrorPage";
import App from "App";
import Login from "features/auth/login/Login";
import CheckEmail from "features/auth/checkEmail/CheckEmail";
import ForgotPassword from "features/auth/forgotPassword/ForgotPassword";
import NewPassword from "features/auth/newPassword/NewPasswors";
import Register from "features/auth/registration/Register";
import Profile from "features/profile/Profile";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "check-email",
        element: <CheckEmail />,
      },
      {
        path: "set-new-password/:token",
        element: <NewPassword />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
