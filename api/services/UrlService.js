/**
 * Created by wayne on 16-1-28.
 */
var request = require('superagent');
module.exports = {
  getNewUrl: function(callback){
    async.waterfall([
      function(cb){
        request.get("http://api.fir.im/apps/latest/56559c1500fc7444a2000009?api_token=8a969b1a2c5b9801925be423e1e15619")
          .end(function (err, res) {
            if(!err && res){
              var result = JSON.parse(res.text);
              if(!_.isEmpty(result) && result.direct_install_url){
                cb(null,result.direct_install_url);
              }else{
                cb("nothing update");
              }
            }else{
              cb(err || "nothing update");
            }

          });
      },
      function(fir,cb){
        request.get("http://api.t.sina.com.cn/short_url/shorten.json?source=5786724301&url_long=" + fir)
          .end(function (err, res) {
            if(!err && res){
              var result = JSON.parse(res.text);
              if(_.isEmpty(result)){
                cb("nothing update");
              }else{
                cb(null,result[0].url_short);
              }
            }else{
              cb(err || "nothing update");
            }
          });
      }
    ],function(err,result){
      if(err){
        callback(err);
      }else{
        callback(null,result);
      }
    });

  }
};
