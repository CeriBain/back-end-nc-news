const db = require("../db/connection");
const { NotFoundError } = require("../errors/custom-errors");

exports.fetchArticles = () => {
  return db
    .query(
      `
      SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id)::INT AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError("Article not found");
      }
      return rows[0];
    });
};

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError("Article not found");
      }
      return db.query(
        "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
        [article_id]
      );
    })
    .then(({ rows }) => rows);
};
exports.insertCommentByArticleId = (article_id, username, body) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError("Article not found");
      }
      return db.query(
        `INSERT INTO comments (article_id, author, body) 
         VALUES ($1, $2, $3) 
         RETURNING *;`,
        [article_id, username, body]
      );
    })
    .then(({ rows }) => rows[0]);
};

