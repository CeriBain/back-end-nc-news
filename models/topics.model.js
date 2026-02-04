const db = require("../db/connection");
exports.fetchTopics = () => {
  //fetchTopics created here and called from controller
  return db.query("SELECT* FROM topics").then(({ rows }) => {
    return rows;
  });
};
exports.fetchArticles = () => {
  return db.query("SELECT * FROM articles").then(({ rows }) => {
    return rows;
  });
};
