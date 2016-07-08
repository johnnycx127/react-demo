import AdminUser from '../models/AdminUser';
import AdminRole from '../models/AdminRole';
import AdminUserProfile from '../models/AdminUserProfile';
import AdminUserType from '../types/AdminUserType';
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const adminUserMutation = {
  adminRegister: {
      type: AdminUserType,
      args: {
        email:{
          type:new NonNull(StringType)
        },
        password:{
          type: new NonNull(StringType)
        }
      },
      async resolve({ request }, { email, password }) {
        const exist = await AdminUser.findOne({ where: { email: email } });
        if (exist) {
          console.log('------------------');
          throw new Error('此邮箱已被使用.');
        }
        const operatorRole = await AdminRole.findOne({ where: { name: 'operator' } });

        const user = await AdminUser.create({
          email: email,
          password: password,
          profile: {
            displayName: email.split('@')[0],
            gender: 'unknow'
          }
        }, {
          attributes: { exclude: ['password', 'salt'] },
          include: [
            { model: AdminUserProfile, as: 'profile' },
          ],
        });

        user.addRoles(operatorRole);
        user.roles = [operatorRole];
        return user;
    }
  }
};

export default adminUserMutation;
