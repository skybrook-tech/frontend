/** @jsx jsx */
import { jsx } from "@emotion/core";
import SignupForm from "../forms/authentication/signup";
import Header from "@core/ui/header";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const containerStyles = theme => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const Signup = props => {
  const dispatch = useDispatch();

  return (
    <div className="fit-parent" css={containerStyles}>
      <Header size="large" color="white">
        <Link to="/">MockEnd</Link>
      </Header>

      <SignupForm {...props} dispatch={dispatch} />

      <Link className="mt2" to="/login">
        <h4 css={{ color: "white" }}>Already have an account? sign in</h4>
      </Link>
    </div>
  );
};

export default Signup;
