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
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, 
              articles.author, articles.body, articles.created_at, 
              articles.votes, articles.article_img_url,
              COUNT(comments.comment_id)::INT AS comment_count
       FROM articles
       LEFT JOIN comments ON articles.article_id = comments.article_id
       WHERE articles.article_id = $1
       GROUP BY articles.article_id;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
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
exports.updateArticleById = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError("Article not found");
      }
      return rows[0];
    });
};

exports.fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortBy = [
    "created_at",
    "author",
    "title",
    "article_id",
    "topic",
    "votes",
    "comment_count",
  ];
  const validOrder = ["asc", "desc"];

  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by column" }); // turn these into the error class?
  }

  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" }); // turn these into the error class?
  }

  let queryStr = `
    SELECT articles.article_id, articles.title, articles.topic, 
           articles.author, articles.created_at, articles.votes, 
           articles.article_img_url,
           COUNT(comments.comment_id)::INT AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
  `;

  const queryParams = [];

  if (topic) {
    queryStr += ` WHERE articles.topic = $1`;
    queryParams.push(topic);
  }

  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order.toUpperCase()};`;

  return db.query(queryStr, queryParams).then(({ rows }) => {
    if (topic && rows.length === 0) {
      return db
        .query("SELECT * FROM topics WHERE slug = $1", [topic])
        .then(({ rows: topicRows }) => {
          if (topicRows.length === 0) {
            return Promise.reject({ status: 404, msg: "Topic not found" });
          }
          return [];
        });
    }
    return rows;
  });
};
