import { User } from 'models/user';
import JWT from 'utils/jwt';
import { getHashPassword, compareHashPassword } from 'utils/encrytp';
import * as config from "config";
const { jwtOption } = config;

async function register(ctx) {
  const data = ctx.request.body;
  const { username, password } = data;

  const hashPwd = await getHashPassword(password);
  const userDoc = {
    name: username,
    password: hashPwd
  };

  try{
    const user = await User.create(userDoc);
    const token = await JWT.sign({ userId: user._id});
    ctx.cookies.set('token', token, jwtOption);
    return user;
  } catch(err) {
    if (err.code === 11000) {
      throw Error('创建用户失败，用户名重复');
    }
  }
}

async function login(ctx) {
  const data = ctx.request.body;
  const { username, password } = data;
  const user = await User.findOne({ name: username }).lean();
  if(!user) {
    throw Error('用户不存在');
  }
  const hasPwd = user.password;

  const checkSuccess = await compareHashPassword(password, hasPwd);
  if (!checkSuccess) {
    throw Error('密码错误');
  }
  const token = await JWT.sign({ userId: user._id });

  ctx.cookies.set('token', token, jwtOption);
  ctx.body = { success: true };
}

async function getUsers(query = {}) {
  return await User.find(query);
}

async function createUser(user) {
  return await User.create(user);
}

async function updateUser(id, user) {
  return await User.findByIdAndUpdate(id, user, { new: true });
}

async function deleteUser(id) {
  const result = await User.deleteOne({ _id: id });
  return { success: result.ok === 1 };
}



export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  register
};
