module.exports = function(app, fs, url, isAuthenticated, passport) {
  var router_theme = require('./theme.js');

  app.get('/theme', isAuthenticated, function(req, res) {
    res.render('theme.html');
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
