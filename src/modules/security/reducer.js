import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false
};

const SecurityStore = createSlice({
  name: "Security",
  initialState,
  reducers: {
    setIsAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    }
  }
});

SecurityStore.actions = {
  onLogin() {
    console.error(
      "You must override the default 'onLogin' and 'onSignup' functions on the Security module."
    );
    return dispatch => {
      dispatch(SecurityStore.actions.setIsAuthenticated(false));
      dispatch(SecurityStore.actions.setToken(null));
    };
  },
  onSignup() {
    console.error(
      "You must override the default 'onLogin' and 'onSignup' functions on the Security module."
    );
    return dispatch => {
      dispatch(SecurityStore.actions.setIsAuthenticated(false));
      dispatch(SecurityStore.actions.setToken(null));
    };
  },
  ...SecurityStore.actions
};

export default SecurityStore;
