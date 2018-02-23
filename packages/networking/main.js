module.exports = function(app, fs, url, isAuthenticated, passport) {
  var router_networking = require('./networking.js');

  app.get('/networking', isAuthenticated, function(req, res) {
    res.render('networking.html');
  });
  app.get('/api/networking', isAuthenticated, function(req, res) {
    let data = router_networking.api_get();
    res.send(data);
  });
  app.post('/api/networking', isAuthenticated, function(req, res) {
    req.accepts('application/json');
    let data = router_networking.api_post(req.query.adaptname, req.body);
    res.send(data);
  });

  app.get('/i18n_load', isAuthenticated, function(req, res) {
    let data = router_auth.i18n_load();
    res.send(data);
  });
  app.get('/i18n_save', isAuthenticated, function(req, res) {
    let data = router_auth.i18n_save(req.query.lang);
    res.send(data);
  });


};
