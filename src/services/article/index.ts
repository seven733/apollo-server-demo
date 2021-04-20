import { Article } from '../../models/article';
import { getPageInfo } from '../../utils/page';
import * as R from 'ramda';

const buildQuery = (query: any) => {
  let newQuery: any = {};

  if (query.title) {
    newQuery.title = new RegExp(query.title, 'i');
  }

  if (query.num) {
    newQuery.num = query.num;
  }
  if (query.tag) {
    newQuery.tags = query.tag;
  }

  return newQuery;
};

async function getArticles(query = {}) {
  const pageInfo = getPageInfo(query);
  query = buildQuery(query);

  const totalCount = await Article.countDocuments(query);
  const articles = await Article.find(query)
    .sort({ num: -1, updatedAt: -1 })
    .skip(pageInfo.skip)
    .limit(pageInfo.limit)
    .lean();

  return { totalCount, articles };
}

async function createArticle(data) {
  return await Article.create(data);
}

async function getTagStatistics() {
  const tags: Article.Tag[] = await Article.aggregate([
    { $match: { _id: { $exists: true } } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const sum = (a: Article.Tag, c: Article.Tag): Article.Tag => {
    a.count += c.count;
    return a;
  };
  const replaceKey = (o: Article.Tag) :Article.Tag => ({ name: o._id, count: o.count });

   // 获取各标签的统计信息,取出统计信息最多的num项，其余的统一到其他标签中
  const statistic = (num: number, data: Article.Tag[]) => R.compose(
    R.map(replaceKey),
    R.converge(
      R.concat,
      [
        R.take(num),
        R.compose(
          R.of,
          R.reduce(sum, { _id: '其他', count: 0 }),
          R.converge(
            R.takeLast,
            [R.pipe(R.length, R.subtract(R.__, num)), R.identity]
          )
        )
      ]
    )
  )(data);

  return statistic(19, tags);
}

async function starArticle(id) {
  await Article.updateOne({ _id: id }, { $inc: { star: 1 } })
  return { success: true };
}

async function collectArticle(id) {
  await Article.updateOne({ _id: id }, { $inc: { collect: 1 } })
  return { success: true };
}

async function getArticleDetail (id) {
  return await Article.findOne({ _id: id });
}

async function unstarArticle(id) {
  await Article.updateOne({ _id: id }, { $inc: { star: -1 } })
  return { success: true };
}

async function cancelCollectArticle(id) {
  await Article.updateOne({ _id: id }, { $inc: { collect: -1 } })
  return { success: true };
}

export default {
  getArticles,
  getArticleDetail,
  createArticle,
  getTagStatistics,
  starArticle,
  collectArticle,
  unstarArticle,
  cancelCollectArticle
};
