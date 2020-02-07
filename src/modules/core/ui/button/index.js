/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { Button } from "semantic-ui-react";
import { Global } from "@emotion/core";
import { getSiteColors, getComponentOverrides } from "./helpers";
import get from "lodash/get";
import merge from "lodash/merge";

const themes = theme => {
  const buttonOverrides = get(theme, "semanticUI.component.Button", {});
  const siteGlobalColors = get(theme, "semanticUI.site.colors", {});
  const siteColors = getSiteColors(siteGlobalColors);
  const componentOverrides = getComponentOverrides(buttonOverrides);

  return merge(siteColors, componentOverrides);
};

const propDrivenStyles = props => {
  const raisedStyles = props.raised
    ? "box-shadow: 0.5px 0.5px 5px rgba(0, 0, 0, 0.15);"
    : "";

  return css`
    &&& {
      ${raisedStyles}
    }
  `;
};

const StyledButton = props => {
  return (
    <>
      <Global styles={themes} />
      <Button css={propDrivenStyles(props)} {...props} />
    </>
  );
};

const AssignedButton = Object.assign(StyledButton, Button);

export default AssignedButton;
