var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');

exports.api_get = function() {
  var qwe = exports.savedata_1();
  exports.savedata_2(qwe);
  let data = fs.readFileSync(__dirname + "/data/" + "summary.json", 'utf8');
  var wpaconfigdata = JSON.parse(data); //json text -> json object
  //console.log(wpaconfigdata);
  return wpaconfigdata;
}
exports.savedata_1 = function() {
  const asd = execSync('ls /sys/class/net | grep -v lo', {
    encoding: 'utf8'
  });
  var arr = asd.split("\n");
  return arr;
}
exports.savedata_2 = function(text) {
  var result_data = {};
  for (var a = 0; a < text.length - 1; a++) {
    const stdout2 = execSync('ip a show ' + text[a], {
      encoding: 'utf8'
    });
    var eth = {};
    eth[text[a]] = stdout2.replace(/\n/gi, "<br>");
    //console.log("eth : " + text[a]);
    var eng = "current_setting_" + text[a];
    result_data[eng] = eth;
    //console.log("eth : " + JSON.stringify(result_data));
    fs.writeFileSync(__dirname + "/data/" + "summary.json",
      JSON.stringify(result_data, null, '\t'), "utf8",
      function(err, data) {
        result = {
          "success": 1
        };
      })
  }
}
exports.api_post = function(adapt_name, json) {
  // input message handling
  let data = exports.api_post_datasave(adapt_name, json);
  return data;
}

exports.api_post_datasave = function(adapt_name, json) {
  // output message
  let data = fs.readFileSync(__dirname + "/data/" + "connecting_lan_data.json", 'utf8');
  var users = JSON.parse(data);
  // ADD TO DATA
  users[adapt_name] = json;
  // SAVE DATA
  let result = new Object();
  fs.writeFileSync(__dirname + "/data/" + "connecting_lan_data.json",
    JSON.stringify(users, null, '\t'), "utf8",
    function(err, data) {
      result.success = 1;
    })
  return result;
}

exports.i18n_load = function() {
  var data = JSON.parse(fs.readFileSync(__dirname + "/../../public/i18n/config.js", 'utf8'));
  console.log(data);
  return data;
}

exports.i18n_save = function(language) {
  var lang_json = {};
  lang_json.language = language;
  fs.writeFileSync(__dirname + "/../../public/i18n/config.js",
    JSON.stringify(lang_json, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
  return language;
}
