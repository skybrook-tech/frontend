/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoginForm from "../forms/authentication/login";
import Header from "../../core/ui/header";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const containerStyles = theme => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const Login = props => {
  const dispatch = useDispatch();

  return (
    <div className="fit-parent" css={containerStyles}>
      <Header size="large">
        <Link to="/">MockEnd</Link>
      </Header>

      <LoginForm {...props} dispatch={dispatch} />

      <Link className="mt2" to="/signup">
        <h4 css={{ color: "white" }}>Don't have an account? sign up</h4>
      </Link>
    </div>
  );
};

export default Login;
