import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const AdminUserProfileType = new ObjectType({
  name: 'AdminUserProfile',
  fields: {
    dispalyName: { type: StringType},
    picture: { type: StringType },
    gender: { type: StringType}
  },
});

export default AdminUserProfileType;
