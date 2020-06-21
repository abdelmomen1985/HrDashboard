import React from "react";
import "./App.css";

import { Box, ThemeProvider, createMuiTheme } from "@material-ui/core";

import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import MainLayout from "../components/layouts/MainLayout";
import Router from './router';


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
            <Router />
          </Box>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
