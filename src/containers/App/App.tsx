/**
 * App - this component should be around all the pages.
 */
import * as React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorBoundray from "../ErrorBoundray";
import Home from "../Home";
import Layout from "../../components/Nav";

const App = () => {
  // const { children } = props;

  return (
    <ErrorBoundray>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </ErrorBoundray>
  );
};

export default App;
