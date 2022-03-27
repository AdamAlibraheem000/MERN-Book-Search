const User = require("../models/User");

const resolvers = {
    Query:{
        users: async (parent, {username}) => {
            const params = username ? {username} : {};
            return User.find(params);
        }
    }
}

module.exports = resolvers;