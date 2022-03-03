/**
 * App - this component should be around all the pages.
 */
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorBoundray from "../ErrorBoundray";
import Home from "../Home";

const App = () => {
  // const { children } = props;

  return (
    <ErrorBoundray>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </ErrorBoundray>
  );
};

export default App;
