/**
 * Created by wayne on 16-2-15.
 */
module.exports = {
  download: function (req, res) {
    if (req.headers['user-agent'].indexOf('MicroMessenger') > -1) {
      return res.send('<div style="position:absolute;right:18px;top:5px;z-index:19999;"><img style="width: 100%" src="/youcheyue/images/shareto1.png"></div>');
    }
    if (isIos(req.headers['user-agent'])) {
      return res.redirect('https://itunes.apple.com/cn/app/id1080937809');
    } else {
      var out_url = 'http://download.fir.im/v2/app/install/56559c1500fc7444a2000009?download_token=3790c7ca27de3b36ea39055e7141a930';
      var need_updated = true;
      async.waterfall([
        function (cb) {
          Url.find({limit: 1, sort: "createdAt DESC"}, function (err, result) {
            if (err) {
              sails.log.error(err);
              need_updated = true;
            } else {
              if (!_.isEmpty(result)) {
                if ((new Date().getTime() - new Date(result[0].createdAt).getTime()) > 24 * 60 * 60 * 1000) {
                  need_updated = true;
                } else {
                  out_url = result[0].url;
                  need_updated = false;
                }
              } else {
                need_updated = true;
              }
            }
            cb(null);
          });
        },
        function (cb) {
          if (need_updated) {
            UrlService.getNewUrl(function (error, got) {
              if (error || !got) {
                sails.log.error(err || 'get url form fir error !');
                cb(null);
              } else {
                out_url = got;
                Url.create({url: got}, function (error2, created) {
                  if (error2) {
                    sails.log.error(error2);
                  }
                  cb(null);
                });
              }
            });
          } else {
            cb(null);
          }
        }
      ], function (err, result) {
        if (err) {
          sails.log.error(err);
        }
        return res.redirect(out_url);
      });

    }
  }
};

function isIos(u) {
  if ((u.indexOf('iPad') > -1) || (u.indexOf('iPhone') > -1)) {
    return true;
  } else {
    return false;
  }
}
