/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Suspense } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation
} from "react-router-dom";
import "./default.css";
import { Loader } from "semantic-ui-react";
import isFunction from "lodash/isFunction";
import { useStore } from "react-redux";

const createPath = ({ path }, match = {}) => {
  let PATH = path;

  if (PATH && PATH[0] !== "/" && match.path !== "/") {
    PATH = `/${path}`;
  }

  return `${match ? match.path : ""}${PATH}`;
};

const defaultLazyLoadingFallback = (
  <div className="fit-parent flex-center">
    <Loader active inverted size="massive" />
  </div>
);

const Routes = ({
  modules,
  routes = [],
  LazyLoadingFallback = defaultLazyLoadingFallback,
  config
}) => {
  const match = useRouteMatch();

  return (
    <div
      id={`${config.name}Module`}
      css={config.moduleContainerStyles}
      className="module"
    >
      <Suspense fallback={LazyLoadingFallback}>
        <Switch>
          {modules.map(submoduleConfig => {
            const { path, name, meta = {}, exact = false } = submoduleConfig;

            const { Component, ...passthroughConfig } = submoduleConfig;

            const PATH = createPath(submoduleConfig, match);

            return (
              <Route key={name} exact={exact} path={PATH}>
                <Component
                  routes={[
                    ...routes,
                    { path, name, fullPath: PATH, meta: { ...meta } }
                  ]}
                  config={passthroughConfig}
                />
              </Route>
            );
          })}
        </Switch>
      </Suspense>
    </div>
  );
};

const createLinks = ({ modules, match }) =>
  modules.map(linkConfig => {
    const { name, path, navLabel } = linkConfig;

    const label = navLabel || name || path.replace("/", "") || "HOME";

    return {
      to: `${match ? match.url : ""}/${path}`,
      config: linkConfig,
      label
    };
  });

const processModules = config =>
  config.modules.reduce((modulesArray, nextModule) => {
    const currentModule = { ...nextModule };

    if (currentModule.module && !currentModule.path && config.name) {
      modulesArray = [...modulesArray, ...currentModule.modules];
    } else {
      if (!currentModule.Component) {
        currentModule.Component = BaseComponent;
      }
      modulesArray.push(currentModule);
    }

    if (
      currentModule.path &&
      modulesArray.filter(({ path }) => path === currentModule.path).length > 1
    ) {
      throw new Error(
        `Two modules were found that share the same path. Check modules with the path -- '${currentModule.path}'`
      );
    }

    return modulesArray;
  }, []);

const BaseComponent = props => {
  const { config = {} } = props;
  const { Layout, redirect } = config;

  const modules = processModules(config);

  const match = useRouteMatch();
  const store = useStore();
  const location = useLocation();
  const history = useHistory();

  const links = createLinks({ match, modules });

  console.log(store.getState());
  const redirectPath = isFunction(redirect)
    ? redirect({ store, match, location })
    : redirect;

  if (redirectPath) {
    history.push(redirectPath);
  }

  if (Layout) {
    return (
      <Layout links={links}>
        <Routes {...props} modules={modules} match={match} />
      </Layout>
    );
  }

  return (
    <Routes
      {...props}
      BaseComponent={BaseComponent}
      modules={modules}
      match={match}
    />
  );
};

export default BaseComponent;
