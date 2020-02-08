/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Icon from "../../core/components/icon";

const sideBarHeaderStyles = css`
  height: 70px;
  background: lightgrey;
  & .close {
    height: 100%;

    & .angle.left {
      margin-right: -4px;
      margin-top: 3px;
    }
  }
`;

const SideBarHeader = ({ setVisible }) => (
  <div className="flex-center relative" css={sideBarHeaderStyles}>
    MockEnd
    <div className="absolute close right-0 top-0 flex-center px2">
      <div
        className="cursor-pointer flex-center transition__grow-sml"
        onClick={() => setVisible(false)}
      >
        <Icon name="angle left" size="small" />
        <Icon name="bars" />
      </div>
    </div>
  </div>
);

export default SideBarHeader;
