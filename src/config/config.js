'use strict';

const config = {
  APP_NAME: 'Bot-Uchiha',
  VERSION: '1.0.0',
  BASE_URL: 'https://api.botuichha.com',
  TIMEOUT: 5000, // 5 seconds
  DEBUG: true,

  // Database settings
  DB: {
    HOST: 'localhost',
    PORT: 27017,
    DB_NAME: 'bot_uchihadb',
  },

  // API keys
  API_KEYS: {
    SERVICE_KEY: 'YOUR_SERVICE_KEY_HERE',
  },

  // Logging settings
  LOGGING: {
    LEVEL: 'info',
    FILE_PATH: './logs/app.log',
  },
};

module.exports = config;
