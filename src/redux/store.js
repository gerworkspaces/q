import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
//setup redux Dev tool
const composeEnhancers = composeWithDevTools({});
//lay data
const initailstore = {
  cartReducer: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? []
  },
};
export const store = createStore(rootReducer, initailstore, composeEnhancers());
