/** @jsx jsx */
import { jsx } from "@emotion/core";
import SignupForm from "../../forms/authentication/signup";
import Header from "../../ui/header";
import { Link } from "@reach/router";

const containerStyles = theme => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: theme.colors.mainGradient
});

const Signup = () => {
  return (
    <div className="fit-parent" css={containerStyles}>
      <Header size="large" color="white">
        <Link to="/">MockEnd</Link>
      </Header>

      <SignupForm />
    </div>
  );
};

export default Signup;
