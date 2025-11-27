class PermissionSystem {
  constructor() {
    this.permissions = {
      OWNER: 4,
      ADM: 3,
      VIP: 2,
      USER: 1,
    };
    this.blacklist = new Set();
    this.whitelist = new Set();
  }

  // Checks if a user has permission
  hasPermission(userRole, requiredRole) {
    return this.permissions[userRole] >= this.permissions[requiredRole];
  }

  // Add a user to the blacklist
  addToBlacklist(userId) {
    this.blacklist.add(userId);
  }

  // Remove a user from the blacklist
  removeFromBlacklist(userId) {
    this.blacklist.delete(userId);
  }

  // Check if a user is blacklisted
  isBlacklisted(userId) {
    return this.blacklist.has(userId);
  }

  // Add a user to the whitelist
  addToWhitelist(userId) {
    this.whitelist.add(userId);
  }

  // Remove a user from the whitelist
  removeFromWhitelist(userId) {
    this.whitelist.delete(userId);
  }

  // Check if a user is whitelisted
  isWhitelisted(userId) {
    return this.whitelist.has(userId);
  }

  // Validate group/private settings
  validateAccess(userId, userRole, isPrivate) {
    if (this.isBlacklisted(userId)) {
      throw new Error('Access denied: User is blacklisted.');
    }
    if (isPrivate && !this.isWhitelisted(userId)) {
      throw new Error(
        'Access denied: User is not whitelisted for private access.',
      );
    }
    // other validation logic based on roles can be added here
  }
}

module.exports = new PermissionSystem();
