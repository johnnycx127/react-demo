import DataType from 'sequelize';
import Model from '../sequelize';
import {pbkdf2Sync, randomBytes} from 'crypto';

const AdminUser = Model.define('AdminUser', {
  id: {
    field: 'id',
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  email: {
    field: 'email',
    type: DataType.STRING(256),
    validate: { isEmail: { msg: '邮箱格式有误' } },
    allowNull: false
  },
  password: {
    field: 'password',
    type: DataType.STRING(256),
  },
  salt: {
    field: 'salt',
    type: DataType.STRING(256),
  },
}, {
  tableName: 'admin_user',
  timestamps: true,
  paranoid: true,
  underscored: true,
  indexes: [
    { unique: true, fields: ['email'] },
  ],
  instanceMethods: {
    hashPassword: function (password) {
      if (this.salt && password) {
        return pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
      }
    },
    authenticate: function (password) {
      return this.password === this.hashPassword(password);
    }
  },
  hooks: {
    beforeCreate: (adminUser, options) => {
      if (adminUser.password) {
        adminUser.salt = randomBytes(16).toString('base64');
        adminUser.password = adminUser.hashPassword(adminUser.password);
      }
    },
    beforeUpdate: (adminUser, options) => {
      if (adminUser.password) {
        adminUser.salt = randomBytes(16).toString('base64');
        adminUser.hashPassword();
      }
    }
  }
});

export default AdminUser;
