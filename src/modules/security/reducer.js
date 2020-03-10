import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false };

const SecurityStore = createSlice({
  name: "Security",
  initialState,
  reducers: {
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    }
  }
});

export default SecurityStore;
