/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoginForm from "../../forms/authentication/login";
import Header from "../../ui/header";
import { Link } from "@reach/router";

const containerStyles = theme => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: theme.colors.mainGradient
});

const Login = () => {
  return (
    <div className="fit-parent" css={containerStyles}>
      <Header size="large" color="white">
        <Link to="/">MockEnd</Link>
      </Header>

      <LoginForm />
    </div>
  );
};

export default Login;
