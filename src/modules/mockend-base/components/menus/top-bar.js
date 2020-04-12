/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import Header from "@core/ui/header";
import Button from "@core/ui/button";
import Menu from "@core/ui/menu";

const TopBar = ({ primary }) => {
  return (
    <Menu
      size="large"
      inverted
      borderless
      css={({ colors }) => ({
        "&&&": {
          padding: "5px 20px",
          backgroundColor: primary ? colors.primary : "transparent",
          boxShadow: "none",
          border: "none",
          borderRadius: 0,
          "& .header": {
            color: "white"
          }
        }
      })}
    >
      <Link data-testid="topBarNav-homeButton" to="/">
        <Menu.Item>
          <Header size="large">MockEnd</Header>
        </Menu.Item>
      </Link>

      <Menu.Menu position="right">
        <Link
          data-testid="topBarNav-loginButton"
          to="/login"
          // state={linkState}
          css={{ "&&&": { display: "flex" } }}
        >
          <Menu.Item>
            <Header size="small">Log In</Header>
          </Menu.Item>
        </Link>

        <Link to="/signup">
          <Menu.Item>
            <Button data-testid="topBarNav-signupButton" color="white">
              Sign Up
            </Button>
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default TopBar;
