import { lazy } from "react";
import SecurityStore from "./reducer";
import createModule from "../core/create-module";

// screens
const loginScreen = {
  Component: lazy(() => import("./screens/login")),
  name: "Login",
  path: "login"
};
const signupScreen = {
  Component: lazy(() => import("./screens/signup")),
  name: "Signup",
  path: "signup"
};

export default createModule({
  name: "Security",
  path: "",
  modules: [loginScreen, signupScreen],
  reducer: SecurityStore.reducer,
  init: ({ store }) => {
    store.dispatch(SecurityStore.actions.setIsLoggedIn(true));
  }
});
