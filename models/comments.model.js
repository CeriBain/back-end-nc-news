const db = require("../db/connection");
const { NotFoundError } = require("../errors/custom-errors");

exports.removeCommentById = (comment_id) => {
  return db
    .query(
      "DELETE FROM comments WHERE comment_id = $1 RETURNING *;",
      [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError("Comment not found");
      }
    });
};