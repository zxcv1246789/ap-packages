module.exports = function(app, fs, url){
	var router_hotspot = require('./hotspot.js');

	app.get('/hotspot', function(req, res) {
    var sess;
    sess = req.session;
    console.log('session : ' + sess.logincheck);
    if (sess.logincheck == "1") {
      res.render('hotspot.html');
    } else {
      res.render('index.html');
    }
  });
  app.get('/api/hotspot', function(req, res) {
    req.accepts('application/json');
    // input message handling
    var type = req.query.type;
    var select = req.query.select;
    if (type == "basic") {
      let data = router_hotspot.api_get_basic();
			res.send(data);
		} else if (type == "security") {
      let data = router_hotspot.api_get_security();
			res.send(data);
		} else if (type == "advanced") {
      let data = router_hotspot.api_get_advanced();
			res.send(data);
		} else if (type == "awk") {
      let data = router_hotspot.api_get_awk();
			res.send(data);
		} else if (type == "get") {
      let data = router_hotspot.api_get();
			res.send(data);
    } else if (type == "logging") {
      let data = router_hotspot.api_get_log();
			res.send(data);
    } else if (type == "wlan0stopstart") {
			if (select == 0) { //stop 시키는 부분
        let data = router_hotspot.hotspot_stop();
				res.send(data);
			} else if (select == 1) { //start 시키는 부분
        let data = router_hotspot.hotspot_start();
				res.send(data);
      } else {
				let data = router_hotspot.start_stopbutton();
				res.send(data);
      }
    }
  });
  app.post('/api/hotspot', function(req, res) {
    req.accepts('application/json');
    // input message handling
    json = req.body;

    console.log('type : ' + json.type);

    if (json.type == "basic") {
			let data = router_hotspot.api_post_basic(json);
			res.json(data);
    } else if (json.type == "security") {
			let data = router_hotspot.api_post_security(json);
			res.json(data);
    } else if (json.type == "advanced") {
			let data = router_hotspot.api_post_advanced(json);
			res.json(data);
    }
  });

	app.get('/i18n_load', function(req, res) {
    let data = router_system.i18n_load();
		res.send(data);
  });
  app.get('/i18n_save', function(req, res) {
    let data = router_system.i18n_save(req.query.lang);
		res.send(data);
	});

};
