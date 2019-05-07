import { Article } from 'models/article';
import { getPageInfo } from 'utils/page';
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

/**
 *  获取各标签的统计信息,取出数量最多的19个标签，其余统一到其他标签中
 */
async function getTagStatistics() {
  const counter: any = await Article.aggregate([
    { $match: { _id: { $exists: true } } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const sum = (a, c) => {
    a.count += c.count;
    return a;
  };
  const mapFn = o => ({ name: o._id, count: o.count });
  return R.compose(
    R.map(mapFn),
    R.append(R.__, R.take(19, counter)),
    R.reduce(sum, { _id: '其他', count: 0 }),
    R.takeLast(R.subtract(counter.length, 19)),
  )(counter);
}

export default {
  getArticles,
  createArticle,
  getTagStatistics,
};
