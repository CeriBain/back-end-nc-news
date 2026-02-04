const express = require("express");
const topicRouter = require("./controllers/topics.controller"); // imports my controller func for topics
const articleRouter = require("./controllers/articles.controller");
const app = express();

app.use(express.json());

app.use("/api/topics", topicRouter); // defines a route for GETTING topics from the api (arg, function to handle rq)
app.use("/api/articles", articleRouter);

module.exports = app;
