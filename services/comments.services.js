
const {
    fetchArticles,
    fetchArticleById,
    fetchCommentsByArticleId,
    insertCommentByArticleId,
    updateArticleById,
  } = require("../models/articles.model");

exports.patchArticleByIdService = (article_id, inc_votes) => {
  return updateArticleById(article_id, inc_votes);
};