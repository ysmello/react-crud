import { createStore, combineReducers, applyMiddleware } from 'redux';
import Redux from 'redux-thunk';

import auth from './reducer/auth';
import products from './reducer/products';

const store = createStore(
  combineReducers({
    auth,
    products
  }),

  applyMiddleware(Redux)
);

export default store;
