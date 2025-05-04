import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Use named import for redux-thunk
import countryReducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  countryReducer, // Ensure the reducer is correctly imported and used
  composeEnhancers(applyMiddleware(thunk)) // Apply middleware and enable Redux DevTools
);

export default store;
