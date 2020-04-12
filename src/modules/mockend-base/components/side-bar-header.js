/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import Icon from "@core/components/icon";
import SideBarMount from "@core/components/ui-mounts/sidebar-mount";
import { Transition as TransitionSUI } from "semantic-ui-react";
import { Transition } from "react-transition-group-v2";

const sideBarHeaderStyles = css`
  height: 70px;

  & .close {
    height: 100%;

    & .angle.left {
      margin-right: -4px;
      margin-top: 3px;
    }
  }
`;

const iconTransition = {
  entering: { transform: "rotate(0)" },
  entered: { transform: "rotate(180deg)" },
  exiting: { transform: "rotate(180deg)" },
  exited: { transform: "rotate(0)" }
};

const SideBarHeader = ({ setReplaced, replaced }) => (
  <>
    <div className="flex-center relative" css={sideBarHeaderStyles}>
      MockEnd
      <div className="absolute close right-0 top-0 flex-center px2">
        <Transition in={replaced} timeout={1}>
          {state => (
            <div
              style={iconTransition[state]}
              className="cursor-pointer flex-center transition__grow-sml"
              onClick={() => setReplaced(!replaced)}
            >
              <Icon fitted name="angle down" />
            </div>
          )}
        </Transition>
      </div>
    </div>

    <SideBarMount>
      <>
        <TransitionSUI
          visible={replaced}
          animation={"fade down"}
          duration={200}
        >
          <div className="project-menu fit-parent p2">
            <div>foo</div>
            <div>foo</div>
            <div>foo</div>
            <div>foo</div>
            <div>foo</div>
          </div>
        </TransitionSUI>
      </>
    </SideBarMount>
  </>
);

export default SideBarHeader;
