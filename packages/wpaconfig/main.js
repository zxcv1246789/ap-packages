module.exports = function(app, fs, url, isAuthenticated, passport) {
  var router_wpaconfig = require('./wpaconfig.js');

  app.get('/wpaconfig', isAuthenticated, function(req, res) {
    res.render('wpaconfig.html');
  });
  app.get('/api/wpaconfig', isAuthenticated, function(req, res) {
    let data = router_wpaconfig.api_get();
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
