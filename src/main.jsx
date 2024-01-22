// add the beginning of your app entry
import "vite/modulepreload-polyfill"

import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { WheelContextProvider } from "./context/Wheel"
import { store } from "./store/store"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <WheelContextProvider>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </WheelContextProvider>
    </Provider>
  </React.StrictMode>
)
