/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";
import Header from "../../ui/header";
import Button from "../../ui/button";
import Menu from "../../ui/menu";

const containerStyles = theme => ({
  backgroundImage: theme.colors.mainGradient
});

const LandingPage = () => {
  return (
    <div css={containerStyles} className="fit-parent">
      <Menu
        size="large"
        inverted
        borderless
        css={{
          "&&&": {
            padding: "10px 20px",
            backgroundColor: "transparent",
            boxShadow: "none",
            border: "none",
            "& .header": {
              color: "white"
            }
          }
        }}
      >
        <Menu.Item>
          <Header size="large">MockEnd</Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Link
            data-testid="landingPage-loginButton"
            to="/login"
            css={{ "&&&": { display: "flex" } }}
          >
            <Menu.Item>
              <Header size="small">Log In</Header>
            </Menu.Item>
          </Link>

          <Link to="/signup">
            <Menu.Item>
              <Button data-testid="landingPage-signupButton" color="white">
                Sign Up
              </Button>
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default LandingPage;
