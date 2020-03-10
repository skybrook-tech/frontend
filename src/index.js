import React from "react";
import createApp from "./modules/core/create-app";
import MockendBase from "./modules/mockend-base";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import globalCSS from "./modules/core/theme/global-css";
import defaultTheme from "./modules/core/theme/theme";
import { Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import merge from "lodash/merge";
import "semantic-ui-css/semantic.min.css";

const Provider = ({ children }) => (
  <ThemeProvider theme={merge(defaultTheme)}>
    <Global styles={globalCSS} />
    {children}
  </ThemeProvider>
);

serviceWorker.unregister();

const App = createApp({ modules: [MockendBase], Provider });

ReactDOM.render(<App />, document.getElementById("root"));
