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

  useEffect(() => {
    // Project.actions().create({ id: 1, foo: "bar" });
    // Project.actions().create({ id: 2, foo: "bar" });
    // Project.actions().update({ id: 1, foo: "foo" });
    // Project.actions().delete(2);
    Project.api().destroy(39);

    // Project.api()
    //   .fetchAll()
    //   .then(res => {
    //     console.log({ res });
    //   });
  }, []);

  const items = useSelector(state => state);

  console.log(items);

  return (
    <div className="fit-parent" css={containerStyles}>
      ProjectPage INIT
    </div>
  );
};

export default ProjectPage;
