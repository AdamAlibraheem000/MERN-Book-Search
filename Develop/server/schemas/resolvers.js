const User = require("../models/User");
const { AuthenticationError } = require('apollo-server-express');
const { signToken} = require('../utils/auth');

const resolvers = {
    Query:{
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password');
                
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');

        },

    },
    
    Mutation:{
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
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

            const token = signToken(user);
            return { token, user};
        }
    }
}

module.exports = resolvers;