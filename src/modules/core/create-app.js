import React from "react";
import { Provider as StoreProvider } from "react-redux";

import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import BaseComponent from "./base-component";

const createApp = (config = {}) => {
  const { modules, Provider = ({ children }) => children } = config;

  console.log({ modules });

  const ModelReducers = {};
  const ModuleReducers = {};
  const ModuleRegistry = {};
  const ModuleActions = {};

  const processModule = config => {
    const { name, models, reducer, modules: submodules = [] } = config;

    if (reducer) {
      ModuleReducers[name] = reducer;
    }

    if (config.module) {
      const {
        Layout,
        reducer,
        modules: ignore,
        moduleContainerStyles,
        ...initialState
      } = config;

      const ModuleSlice = createSlice({
        name,
        initialState: { ...initialState, mock: false },
        reducers: {
          setMock: (state, { payload }) => {
            state.mock = payload;
          }
        }
      });

      ModuleRegistry[name] = ModuleSlice.reducer;
      ModuleActions[name] = ModuleSlice.actions;
    }

    submodules.forEach(processModule);
  };

  modules.forEach(processModule);

  const store = configureStore({
    reducer: {
      ...ModelReducers,
      ...ModuleReducers,
      ModuleRegistry: combineReducers(ModuleRegistry)
    }
  });

  const runInit = ({ init, modules: submodules = [] }) => {
    if (init) init({ store });

    submodules.forEach(runInit);
  };

  modules.forEach(runInit);
  console.log(store.getState());

  return () => (
    <Provider>
      <Router>
        <StoreProvider store={store}>
          {modules.map(moduleConfig => (
            <BaseComponent config={moduleConfig} />
          ))}
        </StoreProvider>
      </Router>
    </Provider>
  );
};

export default createApp;
