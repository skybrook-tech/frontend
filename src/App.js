import React from "react";
import { Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import globalCSS from "../src/theme/global-css";
import theme from "../src/theme/theme";
import "semantic-ui-css/semantic.min.css";
import SideNav from "./view/layouts/side-nav";

function App() {
  console.log(process.env);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalCSS} />
      <div className="App">
        <SideNav />
      </div>
    </ThemeProvider>
  );
}

export default App;
