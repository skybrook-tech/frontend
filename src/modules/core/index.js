import React from "react";
import SideBarLayout from "../core/layouts/side-nav";
import globalCSS from "./theme/global-css";
import defaultTheme from "./theme/theme";
import { Router } from "@reach/router";
import { Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import AuthModule from "../security";
import merge from "lodash/merge";
import CoreErrorHandler from "./components/error-handler";

const Home = () => <div path="/">home</div>;

const CoreAppBuilder = ({
  publicRoutes,
  privateRoutes,
  NotFoundScreenPublic,
  theme = {}
}) => {
  return (
    <ThemeProvider theme={merge(defaultTheme, theme)}>
      <Global styles={globalCSS} />

      <CoreErrorHandler>
        <AuthModule
          NotFoundScreenPublic={NotFoundScreenPublic}
          publicRoutes={publicRoutes}
          privateRoutes={privateRoutes}
        />
      </CoreErrorHandler>
    </ThemeProvider>
  );
};

const CoreLayoutHandler = ({ Layout = SideBarLayout, ...rest }) => {
  return (
    <CoreErrorHandler>
      <Layout {...rest}>
        <Router className="fit-parent">
          <Home path="/" />
          {rest.modules.map(({ Component, route }) => (
            <CoreErrorHandler path={route} key={route}>
              <Component />
            </CoreErrorHandler>
          ))}
        </Router>
      </Layout>
    </CoreErrorHandler>
  );
};

export { CoreLayoutHandler };

export default CoreAppBuilder;
