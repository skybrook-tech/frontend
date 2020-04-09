import createModule from "../core/create-module";
import { lazy } from "react";
import { services } from "../../config/api";
import axios from "axios";
import get from "lodash/get";

// submodules
import projectManager from "../project-manager";
import security from "../security";
import currentUser from "../core/utils/current-user";

const handleFormErrors = (error, setFieldError) => {
  const responseError = get(error, "response.data.error");

  console.log({ error, setFieldError, responseError });

  if (responseError) {
    setFieldError("response", responseError);
  } else {
    setFieldError("response", error);
  }
};

security.actions.onLogin = function(
  values,
  { props, setFieldError, setSubmitting }
) {
  return async dispatch => {
    try {
      const { history, config } = props;

      const { data } = await axios.post(
        `${services.projects.v1.baseURL}/users/login`,
        values
      );
      const token = data.token;

      currentUser.set({ token });

      await dispatch(config.actions.setIsAuthenticated(true));
      await dispatch(config.actions.setToken(token));

      history.push("/projects");
    } catch (error) {
      handleFormErrors(error, setFieldError);
      setSubmitting(false);
    }
  };
};

security.actions.onSignup = function(values, { props, setFieldError }) {
  return async dispatch => {
    try {
      const { history, config } = props;

      const { data } = await axios.post(
        `${services.projects.v1.baseURL}/users/register`,
        values
      );
      const token = data.token;

      currentUser.set({ token });

      await dispatch(config.actions.setIsAuthenticated(true));
      await dispatch(config.actions.setToken(token));

      history.push("/projects");
    } catch (error) {
      handleFormErrors(error, setFieldError);
    }
  };
};

// Screens
const landingPage = {
  Component: lazy(() => import("./screens/landing-page")),
  name: "LandingPAge",
  path: ""
};

const moduleContainerStyles = theme => ({
  backgroundImage: theme.colors.mainGradient
});

export default createModule({
  name: "MockendBase",
  path: "",
  modules: [landingPage, projectManager, security],
  moduleContainerStyles
});
