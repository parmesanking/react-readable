import React from "react";
import { createStore, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'

import thunk from 'redux-thunk';
import App from "./App";

const AppStore = props => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppStore;
