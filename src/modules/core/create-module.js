import { paramCase } from "change-case";

const createPath = name => {
  return paramCase(name);
};

const createModule = (config = {}) => {
  const { name } = config;

  if (!name) throw new Error("Name is required for createModule");

  config.modules = config.modules.map(subModule => {
    if (!subModule.path) {
      subModule.exact = true;
    }

    return { ...subModule };
  });

  const moduleConfig = {
    name,
    module: true,
    path: createPath(name),
    setup() {},
    ...config
  };

  return moduleConfig;
};

export default createModule;
