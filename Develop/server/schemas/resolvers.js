const User = require("../models/User");
const { AuthenticationError } = require('apollo-server-express');

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
        
        login: async (parent, {email,password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError('Login incorrect')
            }

            const correctPass = await user.isCorrectPassword(password);

            if(!correctPass){
                throw new AuthenticationError("Incorrect Password");
            }

            return user;
        }
    }
}

module.exports = resolvers;