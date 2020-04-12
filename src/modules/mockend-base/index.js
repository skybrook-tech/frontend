import createModule from "@core/create-module";
import { lazy } from "react";

// submodules
import projectManager from "../project-manager";
import security from "../security";

// Screens
const landingPage = {
  Component: lazy(() => import("./screens/landing-page")),
  name: "LandingPAge",
  path: ""
};

const moduleContainerStyles = theme => ({
  backgroundImage: theme.colors.mainGradient
});

export default createModule({
  name: "Base",
  authenticatedRedirectPath: "/projects",
  path: "",
  modules: [landingPage, projectManager, security],
  moduleContainerStyles
});
