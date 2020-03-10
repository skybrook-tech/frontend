/** @jsx jsx */
import { jsx } from "@emotion/core";

const containerStyles = theme => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const ProjectPage = props => {
  return (
    <div className="fit-parent" css={containerStyles}>
      ProjectPage INIT
    </div>
  );
};

export default ProjectPage;
