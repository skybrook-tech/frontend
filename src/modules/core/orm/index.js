// orm.js
import { ORM, createReducer } from "redux-orm";

const orm = new ORM({ stateSelector: state => state.orm });

const registerModels = ({ models = [], modules: submodules = [] }) => {
  models.forEach(model => orm.register(model));
  submodules.forEach(registerModels);
};

const initializeModels = (
  { models = [], modules: submodules = [] },
  { store }
) => {
  models.forEach(model => model.init({ store }));
  submodules.forEach(submodule => initializeModels(submodule, { store }));
};

const ormPlugin = (reactModules, modules) => {
  reactModules.addReducer("orm", createReducer(orm));

  modules.forEach(registerModels);

  return ({ store }) => {
    modules.forEach(model => initializeModels(model, { store }));
  };
};

export default ormPlugin;
