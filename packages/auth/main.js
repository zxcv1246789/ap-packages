module.exports = function(app, fs, url){
	var router_auth = require('./auth.js');

	app.get('/auth', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('auth.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/auth', function(req, res) {
    var sess;
    sess = req.session;
    var id = req.query.id;
    var password = req.query.password;
    let check = router_auth.api_get(id, password);
		res.send(check);
  });
  app.post('/api/auth', function(req, res) {
		req.accepts('application/json');
    let data = router_auth.api_post(req.query.id, req.body);
		if (data['success'] == 1) {
			req.session.destroy(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("session is destroy");
        }
      })
		}
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
