import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQGFjY291bnQuY29tIiwiaWQiOjMsImlhdCI6MTU4NDc2MzcyNCwiZXhwIjoxNTg0Nzg1MzI0fQ.cdQDZgejb4VynHgFO_3GnsoOwzpW9S5VJhKs0ZioLj4"
};

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
