const { fetchUsers } = require("../models/users.model");
exports.getUsersService = () => {
  return fetchUsers().then((users) => {
    return users;
  });
};
