import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/core";
import App from "./App";
import indexTheme from "./indexTheme";


ReactDOM.render(
  <ThemeProvider theme={indexTheme}>
    <CssBaseline>
      <App/>
    </CssBaseline>
  </ThemeProvider>

  , document.getElementById('root'));

