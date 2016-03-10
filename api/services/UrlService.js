/**
 * Created by wayne on 16-1-28.
 */
var request = require('superagent');
module.exports = {
  getNewUrl: function(callback){
    async.waterfall([
      function(cb){
        request.get("http://app.youcheyue.com/api/v1/appversion/find?os=android")
          .end(function (err, res) {
            if(!err && res){
              var result = JSON.parse(res.text);
              if(!_.isEmpty(result) && (result.code) == 0 && result.data){
                cb(null,result.data[0].url);
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
