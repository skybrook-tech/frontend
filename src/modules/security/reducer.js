import { createSlice } from "@reduxjs/toolkit";
import currentUser from "@core/utils/current-user";
import { services } from "@config/api";
import axios from "axios";
import get from "lodash/get";
import globalsCache from "@core/globals-cache";

const initialState = {
  isAuthenticated: false,
  tokenChecked: false,
  requestSent: false,
  authenticatedRedirectPath: "/"
};

const SecurityStore = createSlice({
  name: "Security",
  initialState,
  reducers: {
    setAuthenticatedRedirectPath: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
    setRequestSent: (state, { payload }) => {
      state.requestSent = payload;
    },
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setTokenChecked: (state, { payload }) => {
      state.tokenChecked = payload;
    }
  }
});

const handleFormErrors = (error, setFieldError) => {
  const responseError = get(error, "response.data.error");

  if (responseError) {
    setFieldError("response", responseError);
  } else {
    setFieldError("response", error);
  }
};

SecurityStore.actions = {
  onLogin: (values, { props, setFieldError, setSubmitting }) => {
    return async dispatch => {
      try {
        const { history } = props;

        const { data } = await axios.post(
          `${services.users.v1.baseURL}/users/login`,
          values
        );
        const token = data.token;

        currentUser.set({ token });

        const store = globalsCache.get("store");
        const { actions } = globalsCache.get("Security");

        dispatch(actions.setIsAuthenticated(true));
        dispatch(actions.setToken(token));

        const redirectPath = store.getState().ModuleRegistry.Base
          .authenticatedRedirectPath;

        history.push(redirectPath);
      } catch (error) {
        handleFormErrors(error, setFieldError);
        setSubmitting(false);
      }
    };
  },
  onSignup: (values, { props, setFieldError, setSubmitting }) => {
    return async dispatch => {
      try {
        const { history } = props;

        const [firstName, lastName] = values.fullname.split(" ");

        const payload = { ...values, firstName, lastName };

        const { data } = await axios.post(
          `${services.users.v1.baseURL}/users/register`,
          payload
        );
        const token = data.token;

        currentUser.set({ token });

        const store = globalsCache.get("store");
        const { actions } = globalsCache.get("Security");

        dispatch(actions.setIsAuthenticated(true));
        dispatch(actions.setToken(token));

        const redirectPath = store.getState().ModuleRegistry.Base
          .authenticatedRedirectPath;

        history.push(redirectPath);
      } catch (error) {
        handleFormErrors(error, setFieldError);
        setSubmitting(false);
      }
    };
  },
  ...SecurityStore.actions
};

export default SecurityStore;
