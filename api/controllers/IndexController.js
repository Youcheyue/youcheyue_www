/**
 * IndexController
 *
 * @description :: Server-side logic for managing banners
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    if(isPc(req.headers['user-agent'])){
      res.view('index');
    }else{
      res.view('mindex');
    }
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to IndexController)
   */
  _config: {
    rest: true,
    actions: true
  }
};
function isPc(u) {
  if (u.indexOf('iPad') > -1) {
    return true;
  } else if (u.indexOf('Android') > -1 || u.indexOf('iPhone') > -1 || u.indexOf('Windows Phone') > -1 || u.indexOf('Mobile') > -1) {
    return false;
  } else {
    return true;
  }
}
//if (!isPc()) {
//  window.location.href = '/m';
//}
