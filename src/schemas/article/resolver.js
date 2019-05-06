const ArticleService = require('../../service/article');
const R = require('ramda');

const resolvers = {
  Query: {
    articleList: async (_, args) => {
      return await ArticleService.getArticles(args);
    },
    tagStatistics: async (_, args ) => {
      return await ArticleService.getTagStatistics();
    }
  },
  Mutation: {
    createArticle: async (_, args) => {
      return await ArticleService.createArticle(args.article);
    },
  }
};


module.exports = resolvers;
