const {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/articles.model");

exports.getArticlesService = () => {
  return fetchArticles();
};

exports.getArticleByIdService = (article_id) => {
  return fetchArticleById(article_id);
};

exports.getCommentsByArticleIdService = (article_id) => {
  return fetchCommentsByArticleId(article_id);
};
exports.postCommentByArticleIdService = (article_id, username, body) => {
  return insertCommentByArticleId(article_id, username, body);
};
