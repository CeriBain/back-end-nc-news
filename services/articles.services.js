const {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateArticleById,
} = require("../models/articles.model");

exports.getArticlesService = (sort_by, order, topic) => {
  return fetchArticles(sort_by, order, topic);
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

exports.patchArticleByIdService = (article_id, inc_votes) => {
  return updateArticleById(article_id, inc_votes);
};
