module.exports = function(app, fs, url, isAuthenticated, passport) {
  var router_dhcpserver = require('./dhcpserver.js');

  app.get('/dhcpserver', isAuthenticated, function(req, res) {
    res.render('dhcpserver.html');
  });
  app.get('/api/dhcpserver', isAuthenticated, function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
    var select = req.query.select;
    if (type == "clientlist") {
      let data = router_dhcpserver.api_get_clientlist();
      res.send(data);
    } else if (type == "dnsmasq") {
      let data = router_dhcpserver.api_get_dnsmasq();
      res.send(data);
    } else if (type == "get") {
      let data = router_dhcpserver.api_get();
      res.send(data);
    } else if (type == "awk") {
      let data = router_dhcpserver.api_get_awk();
      res.send(data);
    } else if (type == "dnsstopstart") {
      if (select == 0) { //stop 시키는 부분
        let data = router_dhcpserver.dnsmasq_stop();
        res.send(data);
      } else if (select == 1) { //start 시키는 부분
        let data = router_dhcpserver.dnsmasq_start();
        res.send(data);
      } else {
        let data = router_dhcpserver.start_stopbutton();
        res.send(data);
      }
    }
  });
  app.post('/api/dhcpserver', isAuthenticated, function(req, res) {
    req.accepts('application/json');
    let data = router_dhcpserver.api_post(req.body);
    res.send(data);
  });
  app.get('/i18n_load', isAuthenticated, function(req, res) {
    let data = router_system.i18n_load();
    res.send(data);
  });
  app.get('/i18n_save', isAuthenticated, function(req, res) {
    let data = router_system.i18n_save(req.query.lang);
    res.send(data);
  });

};
