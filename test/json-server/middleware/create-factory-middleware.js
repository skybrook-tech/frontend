const createFactoryMiddleware = factories => (req, res, next) => {
  if (req.method === "POST") {
    req.body = factories[req.path.replace("/", "")](req.body);
  }
  next();
};

module.exports = createFactoryMiddleware;
