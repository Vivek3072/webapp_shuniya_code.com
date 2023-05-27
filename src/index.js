import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ScoreFunctionProvider } from "./ContextAPI/userScoreContext";
import { Provider } from "react-redux";
import { store } from "./components/state/store";

ReactDOM.render(
  <Provider store={store}>
    <ScoreFunctionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ScoreFunctionProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
