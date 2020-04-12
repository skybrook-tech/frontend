/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";
import DefaultSideMenu from "../components/menus/side-menu";
import DefaultUserDropdown from "../components/user-dropdown";
import { Transition } from "react-transition-group-v2";
import Icon from "../components/icon";
import { Transition as TransitionSUI } from "semantic-ui-react";

const containerStyles = ({ colors }) => css`
  background-color: ${colors.lightGrey};
`;

const sideBarStyles = (theme, props) => css`
  width: ${props.sideBarWidth};
  height: 100%;
  & #app-side-menu-mount {
    margin-top: -10px;
    padding-top: 10px;
  }
`;

const sideBarHeaderStyles = css`
  height: 70px;
  background: lightgrey;
`;

const screenHeaderStyles = css`
  height: 70px;
`;

const DefaultHeader = ({ setVisible }) => (
  <div className="flex-center relative" css={sideBarHeaderStyles}>
    sidebar header
    <div className="absolute close right-0 top-0 flex-center px2">
      <div
        className="cursor-pointer flex-center transition__grow-sml"
        onClick={() => setVisible(false)}
      >
        <Icon name="angle left" />
        <Icon name="bars" />
      </div>
    </div>
  </div>
);

const CloseMenuIcon = () => <Icon name="bars transition__grow-sml" />;

const CoreLayoutSideNav = props => {
  const {
    children,
    links,
    Header = DefaultHeader,
    SideMenu = DefaultSideMenu,
    UserDropdown = DefaultUserDropdown,
    sideBarWidth = "244px"
  } = props;

  const [visible, setVisible] = useState(true);
  const [replaced, setReplaced] = useState(false);

  const menuTransition = {
    entering: { left: `-${sideBarWidth}` },
    entered: { left: 0 },
    exiting: { left: 0 },
    exited: { left: `-${sideBarWidth}` }
  };

  const screenTransition = {
    entering: { paddingLeft: 0 },
    entered: { paddingLeft: sideBarWidth },
    exiting: { paddingLeft: sideBarWidth },
    exited: { paddingLeft: 0 }
  };

  const menutTransitionMS = "transition-duration-500ms";

  return (
    <div css={containerStyles} className="flex fit-parent">
      <Transition in={visible} timeout={1}>
        {state => (
          <div
            className={`flex flex-column absolute ${menutTransitionMS}`}
            css={theme => sideBarStyles(theme, { sideBarWidth })}
            style={menuTransition[state]}
          >
            <Header
              setVisible={setVisible}
              setReplaced={setReplaced}
              replaced={replaced}
            />
            <div className="flex-auto relative">
              <div id="app-side-menu-mount" className="absolute fit-parent" />

              <TransitionSUI
                visible={!replaced}
                animation={"fade up"}
                duration={200}
              >
                <div className="absolute fit-parent">
                  <SideMenu
                    links={links}
                    visible={visible}
                    setVisible={setVisible}
                  />
                </div>
              </TransitionSUI>
            </div>
          </div>
        )}
      </Transition>

      <Transition in={visible} timeout={1}>
        {state => (
          <div
            className={`flex-auto flex flex-column ${menutTransitionMS}`}
            style={screenTransition[state]}
          >
            <div
              className="flex justify-between items-center px2"
              css={screenHeaderStyles}
            >
              {!visible && (
                <div
                  className="cursor-pointer"
                  onClick={() => setVisible(true)}
                >
                  <CloseMenuIcon />
                </div>
              )}

              <div id="app-screen-header-mount" />

              <div className="">
                <UserDropdown />
              </div>
            </div>

            <div className="flex-auto">{children}</div>
          </div>
        )}
      </Transition>
    </div>
  );
};

CoreLayoutSideNav.defaultProps = {};

CoreLayoutSideNav.propTypes = {};

export default CoreLayoutSideNav;
