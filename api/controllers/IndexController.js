/**
 * IndexController
 *
 * @description :: Server-side logic for managing banners
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    var out_url = 'http://download.fir.im/v2/app/install/56559c1500fc7444a2000009?download_token=3790c7ca27de3b36ea39055e7141a930';
    var need_updated = true;
    async.waterfall([
      function(cb){
        Url.find({limit: 1, sort: "createdAt DESC"},function(err, result){
          if(err){
            sails.log.error(err);
            need_updated = true;
          }else{
            if(!_.isEmpty(result)){
              if((new Date().getTime() - new Date(result[0].createdAt).getTime()) > 24*60*60*1000){
                need_updated = true;
              }else{
                out_url = result[0].url;
                need_updated = false;
              }
            }else{
              need_updated = true;
            }
          }
          cb(null);
        });
      },
      function(cb){
        if(need_updated){
          UrlService.getNewUrl(function(error,got){
            if(error || !got){
              sails.log.error(err || 'get url form fir error !');
              cb(null);
            }else{
              out_url = got;
              Url.create({url:got},function(error2,created){
                if(error2){
                  sails.log.error(error2);
                }
                cb(null);
              });
            }
          });
        }else{
          cb(null);
        }
      }
    ],function(err,result){
      if(err){
        sails.log.error(err);
      }
      if(isPc(req.headers['user-agent'])){
        res.view('index',{url:out_url});
      }else{
        res.view('mindex');

      }
    });

  },
  version: function(req, res) {
    if(isPc(req.headers['user-agent'])){
      res.view('version');
    }else{
      res.view('mindex');
    }
  },
  join: function(req, res) {
    if(isPc(req.headers['user-agent'])){
      res.view('join');
    }else{
      res.view('mindex');
    }
  },
  about: function(req, res) {
    if(isPc(req.headers['user-agent'])){
      res.view('about');
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
  if(!u){
    return true;
  }else{
    if (u.indexOf('iPad') > -1) {
      return true;
    } else if (u.indexOf('Android') > -1 || u.indexOf('iPhone') > -1 || u.indexOf('Windows Phone') > -1 || u.indexOf('Mobile') > -1) {
      return false;
    } else {
      return true;
    }
  }

}
//if (!isPc()) {
//  window.location.href = '/m';
//}
function isIos(u) {
  if ((u.indexOf('iPad') > -1) || (u.indexOf('iPhone') > -1)) {
    return true;
  }  else {
    return false;
  }
}
