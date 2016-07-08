import DataType from 'sequelize';
import Model from '../sequelize';
import AdminUser from './AdminUser';

const AdminRole = Model.define('AdminRole', {
  id: {
    field: 'id',
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  name: {
    field: 'name',
    type: DataType.STRING,
    allowNull: false,
  }
}, {
  tableName: 'admin_role',
  timestamps: true,
  paranoid: true,
  underscored: true,
});

export default AdminRole;
