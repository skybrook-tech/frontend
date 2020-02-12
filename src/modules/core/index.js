import React, { useEffect } from "react";
import SideBarLayout from "../core/layouts/side-nav";
import globalCSS from "./theme/global-css";
import defaultTheme from "./theme/theme";
import { Router } from "@reach/router";
import { Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import AuthModule from "../security";
import merge from "lodash/merge";
import CoreErrorHandler from "./components/error-handler";
import currentUser from "./utils/current-user";
import "semantic-ui-css/semantic.min.css";

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
        <CoreErrorHandler>
          <Router className="fit-parent">
            <Home path="/" />
            {rest.modules.map(({ Component, route }) => (
              <Component path={route} key={route} />
            ))}
          </Router>
        </CoreErrorHandler>
      </Layout>
    </CoreErrorHandler>
  );
};

const createApp = ({ modules, config = {} }) => {
  const { NotFoundScreenPublic, theme } = config;

  const getComponet = ({ Component, route }) => (
    <Component key={route} path={route} />
  );

  const publicRoutes = modules
    .filter(({ requiresAuth }) => !requiresAuth)
    .map(getComponet);
  const privateRoutes = modules
    .filter(({ requiresAuth }) => requiresAuth)
    .map(getComponet);

  return () => {
    useEffect(() => {
      currentUser.init();
    }, []);

    return (
      <CoreAppBuilder
        theme={theme}
        NotFoundScreenPublic={NotFoundScreenPublic}
        publicRoutes={publicRoutes}
        privateRoutes={privateRoutes}
      />
    );
  };
};
export { CoreLayoutHandler };

export default createApp;
