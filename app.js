const express = require("express");
const { getTopics } = require("./controllers/topics.controller"); 
const { getArticles } = require("./controllers/articles.controller");
const { getArticleById } = require("./controllers/articles.controller");
const { getCommentsByArticleId } = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics); 
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/users", getUsers);

app.use((request, response) => {
  response.status(404).send({ msg: "Path not found" });
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  console.error(err);
  response.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
