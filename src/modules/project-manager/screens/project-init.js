/** @jsx jsx */
import { useEffect } from "react";
import { jsx } from "@emotion/core";
import { useStore, useSelector } from "react-redux";
import Project from "../models/projects";

const containerStyles = theme => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const ProjectPage = props => {
  const store = useStore();

  const items = useSelector(state => state);

  return (
    <div className="fit-parent" css={containerStyles}>
      ProjectPage INIT
    </div>
  );
};

export default ProjectPage;
