'use strict';

const permissionsConfig = {
  owners: [],
  admins: [],
  vip: [],
  blacklist: [],
  whitelist: [],
  permissionLevels: {
    user: 0,
    vip: 1,
    admin: 2,
    owner: 3,
  },
};

module.exports = permissionsConfig;
