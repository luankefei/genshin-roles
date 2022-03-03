import { Component } from "react";

import { Page } from "./home.style";
import logo from "./logo.svg";

class Home extends Component {
  render() {
    return (
      <Page>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </Page>
    );
  }
}

export default Home;
