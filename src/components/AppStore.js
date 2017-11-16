import React from "react";
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'

import thunk from 'redux-thunk';
import App from "./App";

const AppStore = props => {
  const store = createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppStore;
