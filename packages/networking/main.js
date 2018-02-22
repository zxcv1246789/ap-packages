module.exports = function(app, fs, url){
	var router_networking = require('./networking.js');

	app.get('/networking', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('networking.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/networking', function(req, res) {
    let data = router_networking.api_get();
		res.send(data);
	});
  app.post('/api/networking', function(req, res) {
		req.accepts('application/json');
    let data = router_networking.api_post(req.query.adaptname, req.body);
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
