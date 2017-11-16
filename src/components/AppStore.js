import React from "react";
import { createStore} from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'

import App from "./App";

const AppStore = props => {
  const store = createStore();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppStore;
