const articleResolvers = require('./articleResolvers');
const categoryResolvers = require('./categoryResolvers');
const userResolvers = require('./userResolvers');

const resolvers = [articleResolvers, categoryResolvers, userResolvers];

module.exports = resolvers