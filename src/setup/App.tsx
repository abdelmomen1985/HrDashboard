import React from "react";
import "./App.css";

import { Box, ThemeProvider, createMuiTheme } from "@material-ui/core";

import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import Router from "./router";

const currentLanguage = localStorage.getItem("lang");

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: currentLanguage !== "en" ? "rtl" : "ltr",
  typography: {
    fontFamily: currentLanguage !== "en" ? "Cairo" : "Arial",
  },
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
  document.body.style.direction = currentLanguage === "en" ? "ltr" : "rtl";
  
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
