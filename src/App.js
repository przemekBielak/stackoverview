import React, { Component } from "react";
import "./App.css";
import Questions from "./components/Questions";
import HeaderContainer from "./components/Header/HeaderContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderContainer />
        <Questions />
      </div>
    );
  }
}

export default App;
