import DataType from 'sequelize';
import Model from '../sequelize';

const AdminUserProfile = Model.define('AdminUserProfile', {
  userId: {
    field: 'user_id',
    type: DataType.UUID,
    primaryKey: true,
  },
  displayName: {
    field: 'display_name',
    type: DataType.STRING(100),
    allowNull: false
  },
  picture: {
    field: 'picture',
    type: DataType.STRING(256),
    allowNull: true,
  },
  gender: {
    field: 'gender',
    type: DataType.ENUM,
    values: ['male', 'female', 'unknow'],
    allowNull: false
  }
}, {
  tableName: 'admin_user_profile',
  timestamps: false,
  paranoid: false,
});

export default AdminUserProfile;
