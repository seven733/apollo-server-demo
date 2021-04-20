import ArticleService from '../../services/article/index';

const resolvers = {
  Query: {
    articleList: async (_, args) => {
      return await ArticleService.getArticles(args);
    },
    articleDetail: async (_, args) => {
      return await ArticleService.getArticleDetail(args.id)
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
    unstarArticle: async (_, args) => {
      return await ArticleService.unstarArticle(args.id)
    },
    cancelCollectArticle: async (_, args) => {
      return await ArticleService.cancelCollectArticle(args.id)
    },
  },
};

export default resolvers;
