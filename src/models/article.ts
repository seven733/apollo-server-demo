import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  // 标题
  title: { type: String, unique: true, required: true },
  // 描述
  description: { type: String },
  // 期号
  num: { type: Number, default: 0 },
  // 链接
  url: { type: String },
  // 标签
  tags: { type: [String], default: [] },
  // star数
  star: { type: Number, default: 0 },
  // 收藏数
  collect: { type: Number, default: 0 }
}, { timestamps: true });

export const Article = mongoose.model('Article', articleSchema);
