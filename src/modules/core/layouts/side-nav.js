/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import DefaultSideMenu from "../components/menus/side-menu";
import DefaultUserDropdown from "../components/user-dropdown";

const containerStyles = ({ colors }) => css`
  background-color: ${colors.lightGrey};
`;

const sideBarStyles = css`
  width: 244px !important ;
`;

const sideBarHeaderStyles = css`
  height: 70px;
  background: lightgrey;
`;

const screenHeaderStyles = css`
  height: 70px;
`;

const DefaultHeader = () => (
  <div className="flex-center" css={sideBarHeaderStyles}>
    sidebar header
  </div>
);

const CoreLayoutSideNav = props => {
  const {
    children,
    modules,
    Header = DefaultHeader,
    SideMenu = DefaultSideMenu,
    UserDropdown = DefaultUserDropdown
  } = props;
  const [visible, setVisible] = useState(true);

  return (
    <div css={containerStyles} className="flex fit-parent">
      <div className="flex flex-column" css={sideBarStyles}>
        <Header />
        <SideMenu modules={modules} visible={visible} setVisible={setVisible} />
      </div>

      <div className="flex-auto flex flex-column">
        <div
          className="flex justify-between items-center px2"
          css={screenHeaderStyles}
        >
          <div id="app-screen-header-mount" />

          <div className="">
            <UserDropdown />
          </div>
        </div>

        <div className="flex-auto">{children}</div>
      </div>
    </div>
  );
};

CoreLayoutSideNav.defaultProps = {};

CoreLayoutSideNav.propTypes = {};

export default CoreLayoutSideNav;
