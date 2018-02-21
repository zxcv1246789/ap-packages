module.exports = function(app, fs, url){
	var router_theme = require('./theme.js');

	app.get('/theme', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('theme.html');
    } else {
      res.render('index.html');
    }
  });

	app.get('/i18n_load', function(req, res) {
    router_theme.i18n_load(req, res);
  });
	app.get('/i18n_save', function(req, res) {
    router_theme.i18n_save(req, res);
  });

};
