const bakedAuth = {
  authorization: "Bearer some.fake.token",
  token: "some.fake.token",
  email: "email@success",
  password: "password-success"
};

const requiresAuth = (req, res, next) => {
  if (req.headers.authorization === bakedAuth.authorization) {
    return next();
  }

  res.status(401).json({ message: "not authorized" });
};

const login = (req, res) => {
  if (
    req.body.email === bakedAuth.email &&
    req.body.password === bakedAuth.password
  ) {
    res.status(200).json({ token: bakedAuth.token });
  }

  res.status(401).json({ message: "not authorized" });
};

module.exports = { requiresAuth, login };
