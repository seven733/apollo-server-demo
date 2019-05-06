const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const path = require('path');

const typeDefs = mergeTypes(fileLoader(`${__dirname}/**/*.graphql`), { all: true })

const resolversArray = fileLoader(path.join(__dirname, './*/resolver.js'));
const resolvers = mergeResolvers(resolversArray);

module.exports = {
  typeDefs,
  resolvers
};
