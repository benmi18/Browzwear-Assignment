import React, { Component } from "react";
import Countries from "./components/Countries";
import Navbar from "./components/Navbar";
import Cities from "./components/Cities";
import Company from "./components/Company";
import GoogleMap from "./components/GoogleMap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Countries />
        <Cities />
        <Company />
        <GoogleMap />
      </div>
    );
  }
}

export default App;
