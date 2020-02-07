/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Menu from "../../ui/menu";
import { Link } from "@reach/router";

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

const SideMenu = ({ modules = [] }) => {
  return (
    <Menu vertical secondary css={sideMenuStyles} className="p1">
      <Menu.Item
        as={Link}
        name={"Home"}
        getProps={isActive}
        to={"./"}
        key={"./"}
      />

      {modules.map(({ name, route }) => (
        <Menu.Item
          as={Link}
          name={name}
          getProps={isActive}
          to={route}
          key={route}
        />
      ))}
    </Menu>
  );
};

export default SideMenu;
