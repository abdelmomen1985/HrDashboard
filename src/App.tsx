import React from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";
import { Box } from "@material-ui/core";
import Demo from "./views/Demo";
import Header from "./components/layouts/Header";
import Branches from "./views/Branches";

function App() {
  return (
    <div className="App">
      <Box height="100%">
        <Router>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/demo" component={Demo} />
          <Route path="/branches" component={Branches} />
        </Router>
      </Box>
    </div>
  );
}

export default App;
