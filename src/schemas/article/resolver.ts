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
    starArticle: async (_, args) => {
      return await ArticleService.starArticle(args.id)
    },
    collectArticle: async (_, args) => {
      return await ArticleService.collectArticle(args.id)
    },
  },
};

export default resolvers;
