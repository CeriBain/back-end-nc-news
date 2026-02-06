const { NotFoundError } = require("./custom-errors");

const handleCustomErrors = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).send({ msg: err.message });
  }
  next(err);
};

const handleServerErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "Internal server error" });
};

module.exports = { handleCustomErrors, handleServerErrors };
