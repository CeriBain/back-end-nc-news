const { fetchArticles } = require("../models/articles.model");

const articleRouter = (request, response, next) => {
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};
module.exports = articleRouter;
