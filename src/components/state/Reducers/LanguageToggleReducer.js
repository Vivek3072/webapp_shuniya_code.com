// Reducer for language toggle
const toggleLanguage = (lang) => {
  return lang;
};

const reducer = (state = "ENG", action) => {
  if (action.type === "TOGGLE_LANGUAGE") {
    // return
    state = toggleLanguage(action.payload);
    return state;
  }
  return state;
};

export default reducer;
