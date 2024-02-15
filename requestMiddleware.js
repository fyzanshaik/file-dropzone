const reqMw = (req, res, next) => {
  console.log(`Incoming ${req.method} request for ${req.url}`);
  next();
};

module.exports = reqMw