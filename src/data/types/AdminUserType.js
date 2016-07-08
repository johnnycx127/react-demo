import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';
import AdminRoleType from './AdminRoleType';
import AdminUserProfileType from './AdminUserProfileType';

const AdminUserType = new ObjectType({
  name: 'AdminUser',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    profile: { type: AdminUserProfileType },
    roles: { type: new List(AdminRoleType) },
  },
});

export default AdminUserType;
