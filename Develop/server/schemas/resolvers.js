const User = require("../models/User");

const resolvers = {
    Query:{
        users: async () => {
            return User.find();
        }
    },
    Mutation:{
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        },
        
        login: async () => {}
    }
}

module.exports = resolvers;