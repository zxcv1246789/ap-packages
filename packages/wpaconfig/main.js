module.exports = function(app, fs, url){
	var router_wpaconfig = require('./wpaconfig.js');

	app.get('/wpaconfig', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('wpaconfig.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/wpaconfig', function(req, res) {
    router_wpaconfig.api_get(req, res);
  });

	app.get('/i18n_load', function(req, res) {
    router_wpaconfig.i18n_load(req, res);
  });
	app.get('/i18n_save', function(req, res) {
    router_wpaconfig.i18n_save(req, res);
  });

};
