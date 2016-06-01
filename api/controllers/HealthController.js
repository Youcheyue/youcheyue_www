/**
 * HealthController
 * @description :: Server-side logic for managing Health
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/**
 * Overrides for the settings in `config/controllers.js`
 * (specific to HealthController)
 */

  slb: function(req,res){
    res.ok();
  },

  ha: function(req,res){
    res.ok();
  },


  _config: {
    rest: true,
    actions: true,
    shortcuts: true
  }

};
