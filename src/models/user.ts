import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, unique: true },
    age: { type: Number, min: 0 },
    wechat: { type: String },
    mobile: { type: String, unique: true, required: true },
    sex: { type: String, enum: ['boy', 'girl'], default: 'boy' },
    isVip: { type: Boolean, default: false },
    status: { type: String, enum: ['normal', 'in_debt'], default: 'normal' },
  },
  { timestamps: true },
);

export const User = mongoose.model('user', UserSchema);
