import AdminRole from '../models/AdminRole';
import AdminRoleType from '../types/AdminRoleType';
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const adminRoleMutation = {
  adminRoleCreate: {
      type: AdminRoleType,
      args: {
        name:{
          type:new NonNull(StringType)
        }
      },
      async resolve({ request }, { name }) {
        const exist = await AdminRole.findOne({ where: { name: name } });
        if (exist) {
          throw new Error('该角色已存在.');
        }
        const role = await AdminRole.create({ name: name });
        return role;
    }
  },
};

export default adminRoleMutation;
