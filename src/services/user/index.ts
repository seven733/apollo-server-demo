import { User } from 'models/user';

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
};
