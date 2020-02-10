import React, { useEffect } from "react";
import theme from "./theme/theme";
import "semantic-ui-css/semantic.min.css";
import currentUser from "../core/utils/current-user";
import contentManager from "../content-manager";
import CoreAppBuilder, { CoreLayoutHandler } from "../core";
import SideBarHeader from "./components/side-bar-header";
import { Redirect } from "@reach/router";

// Screens
import LandingPage from "./screens/landing-page";
import NotFoundScreenPublic from "./screens/404";

const ProjectInitPage = () => {
  return <div>project init page</div>;
};

const modules = [contentManager];

function MockendEntry() {
  useEffect(() => {
    currentUser.init();
  }, []);

  return (
    <CoreAppBuilder
      NotFoundScreenPublic={NotFoundScreenPublic}
      publicRoutes={[<LandingPage path="/" />]}
      privateRoutes={[
        <ProjectInitPage path="projects" />,
        <CoreLayoutHandler
          Header={SideBarHeader}
          modules={modules}
          path="projects/:projectId/*"
        />,
        <Redirect from="app" to="projects" />
      ]}
    />
  );
}

export default MockendEntry;
