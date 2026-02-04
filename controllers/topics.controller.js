const { fetchTopics } = require("../models/topics.model"); // queries the database function
const topicRouter = (request, response, next) => {
  fetchTopics() // calls it here so it fetches the data
    .then((topics) => {
      response.status(200).send({ topics }); // if correct send topics to the client
    })
    .catch(next);
};

module.exports = topicRouter;
