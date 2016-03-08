/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
module.exports.newrelic = {

  /**
   * Array of application names.
   */
  app_name: ['youcheyue_www'],
  /**
   * Your New Relic license key.
   */
  license_key: '2793d9e3e12e805540bc29415a85fcdb3c29cebb',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'warn',
    rules: { ignore : ['^/socket.io/\*/xhr-polling'] }

  }
};
