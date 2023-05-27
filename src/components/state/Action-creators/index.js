export const toggleLanguage = (lang) => {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_LANGUAGE",
      payload: lang,
    });
  };
};
