const { fetchTopics } = require("../models/topics.model");
const topicRouter = (request, response, next) => {
  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch(next);
};
module.exports = topicRouter;
