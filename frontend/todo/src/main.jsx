import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AxiosInterceptor } from "./AxiosInterceptor.jsx";
import "./index.css";
import App from "./App.jsx";
import Provider from "./Context";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
