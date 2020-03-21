import { lazy } from "react";
import SideNavLayout from "../core/layouts/side-nav";
import createModule from "../core/create-module";
import models from "./models";
// submodules
import contentManager from "../content-manager";

// screens
const projectInitScreen = {
  Component: lazy(() => import("./screens/project-init")),
  name: "ProjectInit",
  path: ""
};

export default createModule({
  name: "ProjectManager",
  path: "projects",
  requiresAuth: true,
  // redirect: ({ store }) => {
  //   if (!store.getState().Security.isAuthenticated) return "/login";
  // },
  modules: [
    projectInitScreen,
    {
      name: "Project",
      path: ":projectId",
      Layout: SideNavLayout,
      modules: [contentManager]
    }
  ],
  models
});
