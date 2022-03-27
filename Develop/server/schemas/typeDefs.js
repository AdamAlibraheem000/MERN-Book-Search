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
    
    type Auth{
        token: ID!
        user: User
    }
    
    type Query{
        me: User
        users: [User]
        user(username: String!):User
        books(username: String):[Book]
        # books(_id: ID!): Book
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }

    
`;

module.exports = typeDefs;