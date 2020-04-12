/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Menu from "@ui/menu";
import { Link } from "react-router-dom";

const sideMenuStyles = css`
  &&& {
    box-shadow: none !important;
    background: transparent;
    width: 100% !important ;
    border-radius: 0;
    border: none;
    margin-left: 0;
    margin-right: 0;

    & a,
    a.item {
      margin: 0;
    }
  }
`;

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "item active" } : {};
};

const SideMenu = ({ links = [] }) => {
  return (
    <Menu vertical secondary css={sideMenuStyles} className="p1">
      {links.map(({ label, to }) => (
        <Menu.Item
          as={Link}
          name={label}
          getProps={isActive}
          to={to}
          key={to}
        />
      ))}
    </Menu>
  );
};

export default SideMenu;
