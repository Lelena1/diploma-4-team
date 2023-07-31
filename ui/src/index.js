import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/App";
import storeFactory from './redux/store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={storeFactory()}>
          <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
