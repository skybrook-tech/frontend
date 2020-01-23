import React from "react";
import { Router } from "@reach/router";
import currentUser from "../../utils/current-user";

// public
import LandingPage from "../screens/public/landing-page";
import LoginScreen from "../screens/public/login";
import SignupScreen from "../screens/public/signup";
import NotFoundScreenPublic from "../screens/public/404";

// private
import Dashboard from "../screens/private/dashboard";

const ProtectedRoute = props => {
  const { Screen, path, navigate, ...rest } = props;

  if (!currentUser.get("token")) {
    return <NotFoundScreenPublic />;
  }

  return <Screen path={path} navigate={navigate} {...rest} />;
};

const Routes = () => {
  return (
    <Router className="fit-parent">
      <LandingPage path="/" />
      <LoginScreen path="/login" />
      <SignupScreen path="/signup" />

      <NotFoundScreenPublic default />

      <ProtectedRoute
        className="fit-parent"
        Screen={Dashboard}
        path="/u/:userId/*"
      />
    </Router>
  );
};

export default Routes;
