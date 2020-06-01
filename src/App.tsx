import React from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";
import { Box, ThemeProvider, createMuiTheme } from "@material-ui/core";
import Demo from "./views/Demo";
import Branches from "./views/Branches";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import Employees from "./views/Employees";
import MainLayout from "./components/layouts/MainLayout";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#54BDB0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F2547A",
      contrastText: "#fff",
    },
    error: {
      main: "#f50057",
    },
    text: {
      /*primary: "#ffffff",*/
    },
  },
});

function App() {
  return (
    <div className="App">
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Box height="100%">
            <Router>
              <MainLayout>
                {/** 
                <Header />
                */}
                <Route path="/" exact component={Home} />
                <Route path="/demo" component={Demo} />
                <Route path="/branches" component={Branches} />
                <Route path="/employees" component={Employees} />
              </MainLayout>
            </Router>
          </Box>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
