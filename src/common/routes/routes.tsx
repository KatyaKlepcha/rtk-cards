import { createHashRouter } from 'react-router-dom'
import ErrorPage from 'features/errorPage/ErrorPage'
import App from 'app/App'
import Login from 'features/auth/login/Login'
import CheckEmail from 'features/auth/checkEmail/CheckEmail'
import ForgotPassword from 'features/auth/forgotPassword/ForgotPassword'
import NewPassword from 'features/auth/newPassword/NewPasswors'
import Register from 'features/auth/registration/Register'
import Profile from 'features/profile/Profile'
import Packs from 'features/packs/Packs'
import { PATHS } from './PATHS'
import Cards from 'features/cards/Cards'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: PATHS.login,
        element: <Login />,
      },
      {
        path: PATHS.register,
        element: <Register />,
      },
      {
        path: PATHS.checkEmail,
        element: <CheckEmail />,
      },
      {
        path: PATHS.newPassword,
        element: <NewPassword />,
      },
      {
        path: PATHS.recovery,
        element: <ForgotPassword />,
      },
      {
        path: PATHS.profile,
        element: <Profile />,
      },
      {
        path: PATHS.packsList,
        element: <Packs />,
      },
      {
        path: PATHS.pack,
        element: <Cards />,
      },
    ],
  },
  {},
])
