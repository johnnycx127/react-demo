/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import AdminUser from './AdminUser';
import AdminRole from './AdminRole';
import AdminUserProfile from './AdminUserProfile';

function sync(...args) {
  return sequelize.sync(...args);
}

AdminUser.hasOne(AdminUserProfile, {
  foreignKey: 'user_id',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

AdminUser.belongsToMany(AdminRole, {
  as: 'roles',
  through: 'adminuser_roles'}
);
AdminRole.belongsToMany(AdminUser, {through: 'adminuser_roles'});

export default { sync };
export {
  AdminUser,
  AdminRole,
  AdminUserProfile
};
