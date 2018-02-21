var fs = require("fs");
var exec = require('child_process').exec,
    child;

exports.api_get = function (req, res) {
  fs.readFile(__dirname + "/data/" + "wpaconfigdata.json", 'utf8', function(err, data) {
    var wpaconfigdata = JSON.parse(data); //json text -> json object
    //console.log(wpaconfigdata);
    child = exec("sudo cat /etc/wpa_supplicant/wpa_supplicant.conf", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    var mac = stdout.match(/network\s*=/);
    console.log('result: ' + mac);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    res.send(wpaconfigdata);
  })
}

exports.i18n_load = function(req, res) {
  var data = JSON.parse(fs.readFileSync(__dirname + "/../../public/i18n/config.js", 'utf8'));
  console.log(data);
  res.send(data);
}

exports.i18n_save = function(req, res) {
  var language = req.query.lang;
  var lang_json = {};
  lang_json.language = language;
  fs.writeFileSync(__dirname + "/../../public/i18n/config.js",
    JSON.stringify(lang_json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
  res.send(language);
}
