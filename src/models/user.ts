import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, unique: true, index: true, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

export const User = mongoose.model('user', UserSchema);
