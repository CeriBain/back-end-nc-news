const {
  getArticlesService,
  getArticleByIdService,
  getCommentsByArticleIdService,
  postCommentByArticleIdService,
  patchArticleByIdService,
} = require("../services/articles.services");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;

  getArticlesService(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
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

exports.patchArticleById = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  patchArticleByIdService(article_id, inc_votes)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};
