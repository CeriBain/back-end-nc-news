const express = require("express");
const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/articles.controller");
const { getArticleById } = require("./controllers/articles.controller");
const { getCommentsByArticleId } = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");
const { postCommentByArticleId } = require("./controllers/articles.controller");
const { patchArticleById } = require("./controllers/articles.controller");
const { deleteCommentById } = require("./controllers/comments.controller");
const app = express();
const {
  handleCustomErrors,
  handleServerErrors,
  handlePSQLErrors,
} = require("./errors/error-handlers");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/users", getUsers);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.patch("/api/articles/:article_id", patchArticleById);
app.delete("/api/comments/:comment_id", deleteCommentById);

app.use("/api", express.static(`${__dirname}/public`));

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

app.use((request, response) => {
  response.status(404).send({ msg: "Path not found" });
});
module.exports = app;
