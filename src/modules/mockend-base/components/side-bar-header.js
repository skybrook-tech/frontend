/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const sideBarHeaderStyles = css`
  height: 70px;
  background: lightgrey;
`;

const SideBarHeader = () => (
  <div className="flex-center" css={sideBarHeaderStyles}>
    MockEnd
  </div>
);

export default SideBarHeader;
