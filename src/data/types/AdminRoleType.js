import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const AdminRoleType = new ObjectType({
  name: 'AdminRole',
  fields: {
    name: { type: new NonNull(StringType) },
  },
});

export default AdminRoleType;
