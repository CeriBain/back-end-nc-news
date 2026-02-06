const {
  getArticlesService,
  getArticleByIdService,
  getCommentsByArticleIdService,
  postCommentByArticleIdService,
} = require("../services/articles.services");

exports.getArticles = (request, response, next) => {
  getArticlesService()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};
exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  getArticleByIdService(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};
exports.getCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  getCommentsByArticleIdService(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
};
exports.postCommentByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body } = request.body;
  postCommentByArticleIdService(article_id, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
};
