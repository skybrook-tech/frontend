import isObject from "lodash/isObject";

const replaceUrlVariables = (path, params = {}) => {
  let pathWithReplaceVariables = path;

  Object.entries(params).forEach(([variable, param]) => {
    pathWithReplaceVariables = pathWithReplaceVariables.replace(
      `:${variable}`,
      param
    );
  });

  return pathWithReplaceVariables;
};

const createRoute = path => {
  let absolutePath = path;
  let relativePath = path;
  let wildCard = `${path}/*`;

  if (isObject(path)) {
    absolutePath = path.absolute;
    relativePath = path.relative;
  }

  let route = {
    path: absolutePath,
    relativePath: relativePath,
    toUrl: params => replaceUrlVariables(route.path, params),
    toRelativeUrl: params => replaceUrlVariables(route.relativePath, params),
    wildCard
  };

  return route;
};

const routes = {
  landingPage: createRoute("/"),
  login: createRoute("/login"),
  signup: createRoute("/signup"),
  app: createRoute("/u/:userId"),
  base: createRoute("/")
};

export default routes;
