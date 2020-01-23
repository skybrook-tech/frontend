/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";
import { Menu } from "semantic-ui-react";

const containerStyles = css`
  display: flex;
`;

const sideMenuStyles = css`
  background: var(--main-primary);
  width: 200px;
`;

const screenStyles = css``;

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div css={sideMenuStyles}>
      <Menu text vertical>
        <Menu.Item>
          <Menu.Header>Products</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="messages"
              active={activeItem === "messages"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="friends"
              active={activeItem === "friends"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    </div>
  );
};

const SideNav = () => {
  return (
    <div css={containerStyles} className="fit-parent">
      <SideMenu />
      <div css={screenStyles}>screen</div>
    </div>
  );
};

export default SideNav;
