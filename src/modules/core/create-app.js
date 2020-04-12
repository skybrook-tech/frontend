import React from "react";
import { Provider as StoreProvider } from "react-redux";
import globalsCache from "./globals-cache";
import {
  createSlice,
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";
import BaseComponent from "./base-component";

const processModule = (reactModules, config) => {
  const { name, modules: submodules = [] } = config;

  if (config.module) {
    const cache = {};

    cache.actions = config.actions || {};

    globalsCache.set(name, cache);
  }

  if (config.setup) {
    config.setup(reactModules);
  }

  if (config.module) {
    const {
      Layout,
      reducer,
      modules: ignore,
      moduleContainerStyles,
      models,
      setup,
      redirect,
      actions,
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
    middleware: [],
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
    addReduxMiddleware: (middleware = []) => {
      setup.middleware.push(middleware);
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
    },
    middleware: [...getDefaultMiddleware(), ...setup.middleware]
  });

  pluginCallbacks.forEach((pluginCallback = () => null) =>
    pluginCallback({ store })
  );

  globalsCache.set("store", store);

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
