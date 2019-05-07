import ArticleService from 'services/article/index';

const resolvers = {
  Query: {
    articleList: async (_, args) => {
      return await ArticleService.getArticles(args);
    },
    tagStatistics: async (_, args) => {
      return await ArticleService.getTagStatistics();
    },
  },
  Mutation: {
    createArticle: async (_, args) => {
      return await ArticleService.createArticle(args.article);
    },
  },
};

export default resolvers;
