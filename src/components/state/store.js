import { applyMiddleware, createStore } from "redux";
import reducers from "./Reducers";
import thunk from "redux-thunk";

// Global redux store for state management

export const store = createStore(
  reducers,
  { language: "ENG" },
  applyMiddleware(thunk)
);
