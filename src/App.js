import React, { useEffect } from "react";
import { Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import globalCSS from "../src/theme/global-css";
import theme from "../src/theme/theme";
import "semantic-ui-css/semantic.min.css";
import Routes from "./view/routes";
import currentUser from "./utils/current-user";

function App() {
  useEffect(() => {
    currentUser.init();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalCSS} />

      <div className="App">
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
