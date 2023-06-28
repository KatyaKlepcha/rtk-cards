import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './common/routes/routes'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalError } from 'common/components/GlobalError/GlobalError'
import 'react-toastify/dist/ReactToastify.css'
import App from './app/App'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/*<App />*/}
    <RouterProvider router={router} />
    <GlobalError />
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
