const { fetchArticles } = require("../models/articles.model");
exports.getArticlesServce = () => {
  return fetchArticles().then((articles) => {
    return articles;
  });
};
