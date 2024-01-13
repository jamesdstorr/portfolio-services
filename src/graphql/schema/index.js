
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    getAllPublishedArticles(categories: [String]): [Article!]
    getArticleById(id: String!): Article
    getArticlesByDate(from: String!, to: String!): [Article!]
    getCategories: [Category]
    getAllProjects: [Article!]
    getAllArticles: [Article!]
}

input ArticleInput {
    title: String!
    summary: String!
    content: String!
    imageUrl: String!
    categories: [String]
    published: Boolean!
    project: Boolean!
    id: String
}

input UserInput {
    username: String!
    password: String!
    firstName: String
    lastName: String
}

type Mutation {
    createArticle(input: ArticleInput!): Article!
    createCategory(categoryName: String!): Category!
    deleteArticle(id: String!): Boolean!
    login(username: String!, password: String!): AuthConfirm!
    createUser(input:UserInput!): AuthConfirm!
}

type Article {
    id: String
    title: String
    summary: String
    content: String
    imageUrl: String
    date: String
    categories: [String]
    published: Boolean
    project: Boolean
}

type Category {
    id: String
    name: String
}

type Token {
    token: String!
}

type AuthConfirm {
    message: String!
}
`;


module.exports = typeDefs;