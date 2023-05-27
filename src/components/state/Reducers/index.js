import { combineReducers } from "redux";
// import reducer from "./LanguageToggleReducer";
import LanguageToggleReducer from "./LanguageToggleReducer";

const reducers = combineReducers({
  language: LanguageToggleReducer,
});

export default reducers;
