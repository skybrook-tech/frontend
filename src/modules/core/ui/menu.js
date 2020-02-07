/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Menu } from "semantic-ui-react";

// Example for how to theme the semantic-ui Menu compnents
const styleOverrides = css``;

const ThemedMenu = props => <Menu css={styleOverrides} {...props} />;

const AssignedMenu = Object.assign(ThemedMenu, Menu);

export default AssignedMenu;
