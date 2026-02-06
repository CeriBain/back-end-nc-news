const { NotFoundError } = require("./custom-errors");

const handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

const handleServerErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "Internal server error" });
};

const handleCustomErrors = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).send({ msg: err.msg });
  }
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};
module.exports = {
  handlePSQLErrors,
  handleCustomErrors,
  handleServerErrors,
};
