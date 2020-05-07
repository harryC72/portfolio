import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./flux/store";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
