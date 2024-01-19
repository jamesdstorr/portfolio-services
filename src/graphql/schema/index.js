
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    getAllPublishedArticles(categories: [String], limit: Int, offset: Int): getAllPublishedArticlesResponse
    getArticleById(id: String!): Article
    getArticlesByDate(from: String!, to: String!): [Article!]
    getCategories: [Category]
    getAllProjects: [Article!]
    getAllArticles: [Article!]
    verifyToken: AuthConfirmation!
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
    login(username: String!, password: String!): AuthToken!
    createUser(input:UserInput!): AuthToken!
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

type AuthToken {
    token: String!
}

type AuthConfirmation {
    authenticated: Boolean
}

type getAllPublishedArticlesResponse {
    articles: [Article!]
    total: Int!
}
`;


module.exports = typeDefs;