import React, { useEffect } from "react";
import theme from "./theme/theme";
import "semantic-ui-css/semantic.min.css";
import currentUser from "../core/utils/current-user";
import moduleA from "./module-a";
import moduleB from "./module-b";
import CoreAppBuilder, { CoreLayoutHandler } from "../core";
import SideBarHeader from "./components/side-bar-header";

// Screens
import LandingPage from "./screens/landing-page";
import NotFoundScreenPublic from "./screens/404";

const modules = [moduleA, moduleB];

function MockendEntry() {
  useEffect(() => {
    currentUser.init();
  }, []);

  return (
    <CoreAppBuilder
      NotFoundScreenPublic={NotFoundScreenPublic}
      publicRoutes={[<LandingPage path="/" />]}
      privateRoutes={[
        <CoreLayoutHandler
          Header={SideBarHeader}
          modules={modules}
          path="u/:userId/*"
        />
      ]}
    />
  );
}

export default MockendEntry;
