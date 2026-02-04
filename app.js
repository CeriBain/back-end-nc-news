const express = require("express");
const topicRouter = require("./controllers/topics.controller");
const app = express();

app.use(express.json());

app.use("/api/topics", topicRouter);

module.exports = app;


