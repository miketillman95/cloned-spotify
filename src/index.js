import React from "react";
import ReactDOM from "react-dom";
import App from "../src/App.js";
import GlobalStyles from "./Components/styles/GlobalStyles.styles.js"

ReactDOM.render(
  <>
  <GlobalStyles/>
    <App />
  </>,
  document.getElementById("root")
);
