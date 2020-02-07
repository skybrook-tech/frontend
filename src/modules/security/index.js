import React from "react";
import { Router } from "@reach/router";
import SecurityScreenLogin from "./screens/login";
import SecurityScreenSignup from "./screens/signup";
import Public404 from "../core/screens/404";
import currentUser from "../core/utils/current-user";

const PrivateRoutes = ({ children, NotFoundScreenPublic, location }) => {
  console.log({ children });
  if (!currentUser.get("token")) {
    return <NotFoundScreenPublic location={location} />;
  }

  return <>{children}</>;
};

const AuthModule = ({
  privateRoutes,
  publicRoutes,
  LoginScreen = SecurityScreenLogin,
  SignupScreen = SecurityScreenSignup,
  NotFoundScreenPublic = Public404
}) => {
  return (
    <Router className="fit-parent reach-router">
      {publicRoutes}
      <PrivateRoutes
        NotFoundScreenPublic={NotFoundScreenPublic}
        className="fit-parent"
        path="/"
      >
        {privateRoutes}
      </PrivateRoutes>

      <LoginScreen path="/login" />
      <SignupScreen path="/signup" />
    </Router>
  );
};

export default AuthModule;
