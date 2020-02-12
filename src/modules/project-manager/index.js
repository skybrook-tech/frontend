import React from "react";
import contentManager from "../content-manager";
import { CoreLayoutHandler } from "../core";
// import SideBarHeader from "./components/side-bar-header";
import { Redirect, Router } from "@reach/router";

const modules = [contentManager];

const ProjectInitPage = () => {
  return <div>project init page</div>;
};

const project = {
  Component: props => {
    console.log({ props });
    return (
      <Router>
        <ProjectInitPage path="/" />
        <CoreLayoutHandler modules={modules} path=":projectId/*" />
        <Redirect from="app" to="projects" />
      </Router>
    );
  },
  name: "ProjectManager",
  route: "projects/*",
  requiresAuth: true
};

export default project;
