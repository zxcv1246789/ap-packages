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
    let data = router_wpaconfig.api_get();
		res.send(data);
  });

	app.get('/i18n_load', function(req, res) {
    let data = router_auth.i18n_load();
		res.send(data);
  });
	app.get('/i18n_save', function(req, res) {
    let data = router_auth.i18n_save(req.query.lang);
		res.send(data);
  });

};
