import React from "react";

import AppContainer from "./containers/App";
// import { BrowserRouter } from "react-router-dom";

import { globalStyles } from "./styles/globlas";
// import logo from "./logo.svg";

function App() {
  return (
    <>
      {globalStyles}
      <AppContainer />
    </>
  );
}

export default App;
