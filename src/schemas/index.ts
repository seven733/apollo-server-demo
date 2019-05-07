import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import * as path from 'path';

const typeDefs = mergeTypes(fileLoader(`${__dirname}/**/*.graphql`), {
  all: true,
});
const resolversArray = fileLoader(path.join(__dirname, './*/resolver.ts'));
const resolvers = mergeResolvers(resolversArray);

export { resolvers, typeDefs };
