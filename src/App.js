import React from "react";
import Dashboard from "./Components/Dashboard.js";
import Login from "./Components/Login.js";
import {Container} from './Components/styles/App.styles.js'

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  return <Container>{code ? <Dashboard code={code} /> : <Login />}</Container>;
}

export default App;
