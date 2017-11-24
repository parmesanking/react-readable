import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import reducer from "../reducers";

import thunk from "redux-thunk";
import App from "./App";

const AppStore = props => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact  component={App} />
          <Route path="/:category" exact component={App} />
          <Route path="/:category/:postid" exact component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default AppStore;
