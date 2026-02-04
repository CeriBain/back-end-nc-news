const { fetchTopics } = require("..models/topics.model");
exports.topicsRouter = (request, response, next) => {
  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch(next);
};
