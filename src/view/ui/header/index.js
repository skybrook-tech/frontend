/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Global } from "@emotion/core";
import { getSiteColors, getComponentOverrides } from "./helpers";
import get from "lodash/get";
import merge from "lodash/merge";
import { Header } from "semantic-ui-react";

const themes = theme => {
  const headerOverrides = get(theme, "semanticUI.component.Header", {});
  const siteGlobalColors = get(theme, "semanticUI.site.colors", {});

  const siteColors = getSiteColors(siteGlobalColors);
  const componentOverrides = getComponentOverrides(headerOverrides);

  return merge(siteColors, componentOverrides);
};

const StyledHeader = props => {
  return (
    <>
      <Global styles={themes} />
      <Header {...props} />
    </>
  );
};

const AssignedHeader = Object.assign(StyledHeader, Header);

export default AssignedHeader;
