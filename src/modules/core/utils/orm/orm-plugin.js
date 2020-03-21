// orm.js
import { ORM, createReducer } from "redux-orm";

const orm = new ORM({ stateSelector: state => state.orm });

const registerModels = ({ models = [], modules: submodules = [] }) => {
  models.forEach(model => orm.register(model));
  submodules.forEach(registerModels);
};

const initializeModels = (
  { models = [], modules: submodules = [] },
  initConfig
) => {
  models.forEach(model => model.init(initConfig));
  submodules.forEach(submodule => initializeModels(submodule, initConfig));
};

const ormPlugin = (reactModules, modules) => {
  reactModules.addReducer("orm", createReducer(orm));

  modules.forEach(registerModels);

  return ({ store }) => {
    modules.forEach(model => initializeModels(model, { store, orm }));
  };
};

export default ormPlugin;
