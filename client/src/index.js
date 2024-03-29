import React from "react";
import './index.css'
import ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "react-redux";
import { createStore,applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
