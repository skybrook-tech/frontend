import React from "react";
import { Provider as StoreProvider } from "react-redux";

import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import BaseComponent from "./base-component";

const processModule = (reactModules, config) => {
  const { name, setup, modules: submodules = [] } = config;

  if (setup) {
    setup(reactModules);
  }

  if (config.module) {
    const {
      Layout,
      reducer,
      modules: ignore,
      moduleContainerStyles,
      models,
      setup,
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

    reactModules._private.registerModule(name, ModuleSlice.reducer);
    reactModules._private.addModuleActions(name, ModuleSlice.actions);
  }

  submodules.forEach(submodule => processModule(reactModules, submodule));
};

const createApp = (config = {}) => {
  const {
    modules = [],
    Provider = ({ children }) => children,
    plugins = []
  } = config;

  const pluginCallbacks = [];
  const setup = {
    reducers: {},
    ModuleRegistry: {},
    ModuleActions: {}
  };

  const reactModules = {
    addReducer: (name, reducer) => {
      if (setup.reducers[name]) {
        throw new Error(`A reducer with the name "${name}" already exists.`);
      }
      setup.reducers[name] = reducer;
    },
    _private: {
      registerModule: (name, reducer) => {
        setup.ModuleRegistry[name] = reducer;
      },
      addModuleActions: (name, actions) => {
        setup.ModuleActions[name] = actions;
      }
    }
  };

  modules.forEach(Module => processModule(reactModules, Module));

  plugins.forEach(plugin => {
    const pluginCallback = plugin(reactModules, modules);
    pluginCallbacks.push(pluginCallback);
  });

  const store = configureStore({
    reducer: {
      ...setup.reducers,
      ModuleRegistry: combineReducers(setup.ModuleRegistry)
    }
  });

  pluginCallbacks.forEach((pluginCallback = () => null) =>
    pluginCallback({ store })
  );

  return () => (
    <Provider>
      <StoreProvider store={store}>
        <Router>
          {modules.map(moduleConfig => (
            <BaseComponent key={moduleConfig.name} config={moduleConfig} />
          ))}
        </Router>
      </StoreProvider>
    </Provider>
  );
};

export default createApp;
