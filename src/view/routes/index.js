import React, { useEffect } from "react";
import { Router } from "@reach/router";
import SideNav from "../layouts/side-nav";

// public
import LandingPage from "../screens/public/landing-page";
import LoginScreen from "../screens/public/login";
import SignupScreen from "../screens/public/signup";
import NotFoundScreenPublic from "../screens/public/404";

// private
import Dashboard from "../screens/private/dashboard";

const Routes = () => {
  return (
    <Router className="fit-parent">
      <LandingPage path="/" />
      <LoginScreen path="/login" />
      <SignupScreen path="/signup" />

      <NotFoundScreenPublic default />

      {/* TODO: wrap Dashboard in private route */}
      <Dashboard path="/u/:userId" />
    </Router>
  );
};

export default Routes;
