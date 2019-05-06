const UserService = require('../../service/user');
const R = require('ramda');

const resolvers = {
  Query: {
    users: async (_, args) => {
      let query = {};
      if (!R.isNil(args.name)) {
        query.name = args.name;
      }
      if (!R.isNil(args.isVip)) {
        query.isVip = args.isVip;
      }
      return await UserService.getUsers(query);
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      return await UserService.createUser(args.user);
    },
    updateUser: async (_, args) => {
      return await UserService.updateUser(args.id, args.user);
    },
    deleteUser: async (_, args) => {
      return await UserService.deleteUser(args.id);
    }
  }
};


module.exports = resolvers;
