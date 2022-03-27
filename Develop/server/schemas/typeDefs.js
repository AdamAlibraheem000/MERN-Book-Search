const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book{
        _id: ID
        title: String
        description: String
        image: String
        link: String
        authors: String
        # authors may need to be an array
    }
    
    
    type Query{
        users: [User]
        users(username: String!): [User]
        
    }
`;

module.exports = typeDefs;