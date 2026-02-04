const db = require("../connection");
const format = require("pg-format");
const topics = require("../data/test-data/topics");
const seedLookupObj = require("./seedUtils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE topics(
          slug VARCHAR(250) PRIMARY KEY,
          description VARCHAR(250),
          img_url VARCHAR(1000)
        )`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users(
          username VARCHAR(250) PRIMARY KEY,
          name VARCHAR(40),
          avatar_url VARCHAR(1000)
        )`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE articles(
          article_id SERIAL PRIMARY KEY,
          title VARCHAR(250),
          topic VARCHAR(250) REFERENCES topics(slug),
          author VARCHAR(250) REFERENCES users(username),
          body TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes INT DEFAULT 0,
          article_img_url VARCHAR(1000)
        )`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE comments(
          comment_id SERIAL PRIMARY KEY,
          article_id INT REFERENCES articles(article_id) NOT NULL,
          body TEXT,
          votes INT DEFAULT 0,
          author VARCHAR(250) REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    })
    .then(() => {
      const formatTopics = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const topicStrQ = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L`,
        formatTopics
      );
      return db.query(topicStrQ);
    })
    .then(() => {
      const formatUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const userStrQ = format(
        `INSERT INTO users(username, name, avatar_url) VALUES %L`,
        formatUsers
      );
      return db.query(userStrQ);
    })
    .then(() => {
      const formatArticles = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });
      const articleStrQ = format(
        `INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
        formatArticles
      );

      return db.query(articleStrQ);
    })
    .then(({ rows }) => {
      const articleLookUpObj = seedLookupObj(rows, "title", "article_id");
      const formatComments = commentData.map((comment) => {
        return [
          articleLookUpObj[comment.article_title],
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });
      const commentStrQ = format(
        `INSERT INTO comments(article_id, body, votes, author, created_at) VALUES %L`,
        formatComments
      );
      return db.query(commentStrQ);
    });
};

module.exports = seed;
