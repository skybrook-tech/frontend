// eslint-disable-next-line
const jsonServer = require("json-server");
// eslint-disable-next-line
const jsonGraphqlExpress = require("json-graphql-server").default;
const middleware = require("./middleware");

const apiV2Ops = require("./models/rest-api/v2-ops");

const server = jsonServer.create();

server.use(jsonServer.bodyParser);
server.use(jsonServer.defaults());

const wrapResponseInData = (req, res) => {
  res.jsonp({ data: res.locals.data });
};

const apiV2OpsRouter = jsonServer.router(apiV2Ops.data);
apiV2OpsRouter.render = wrapResponseInData;

server.post("/api/v2/ops/login", middleware.auth.login);

server.use(
  "/api/v2/ops",
  middleware.createFactoryMiddleware(apiV2Ops.factories),
  middleware.auth.requiresAuth,
  apiV2OpsRouter
);
server.use(
  "/graphql",
  middleware.auth.requiresAuth,
  jsonGraphqlExpress(apiV2Ops.data)
);

server.listen(5555, () => {
  /* eslint-disable */
  console.log(`JSON Server is running on http://localhost:${5555}`);
});
