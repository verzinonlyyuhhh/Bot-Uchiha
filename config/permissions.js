const Permissions = {
  PUBLIC: 0,
  MEMBER: 1,
  MODERATOR: 2,
  ADMIN: 3,
  OWNER: 4,
};

let owners = []; // List of owners
let blockedUsers = []; // List of blocked users

function checkUserLevel(user) {
  if (owners.includes(user)) return Permissions.OWNER;
  // Logic for other levels would go here, e.g., checking roles in a database
  return Permissions.PUBLIC; // Default to PUBLIC if none specified
}

function addOwner(user) {
  if (!owners.includes(user)) {
    owners.push(user);
  }
}

function removeOwner(user) {
  const index = owners.indexOf(user);
  if (index > -1) {
    owners.splice(index, 1);
  }
}

function blockUser(user) {
  if (!blockedUsers.includes(user)) {
    blockedUsers.push(user);
  }
}

function getPermissionInfo() {
  return {
    owners: owners,
    blockedUsers: blockedUsers,
    permissionLevels: Permissions,
  };
}

module.exports = {
  checkUserLevel,
  addOwner,
  removeOwner,
  blockUser,
  getPermissionInfo,
  Permissions,
};
