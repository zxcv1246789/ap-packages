var fs = require("fs");

exports.api_get = function(id, password) {
  let data = fs.readFileSync(__dirname + "/../../userdata/" + "userdata.json", 'utf8');
  var userdata = JSON.parse(data); //json text -> json object
  var check = {};
  if (id == userdata['admin']['username'] && password == userdata['admin']['password']) {
    check['check'] = "1";
  } else {
    check['check'] = "0";
  }
  return check;
}

exports.api_post = function(user_name, body) {
  // input message handling
  var result = {};
  var user_name = user_name;
  var json = body;
  console.log(user_name);
  console.log('--------------------------------------');
  console.log('changed password : ' + json.password);
  let result_ = exports.api_post_datasave(body, user_name, result);
  return result_;
}

exports.api_post_datasave = function(body, user_name, result) {

  let data = fs.readFileSync(__dirname + "/../../userdata/" + "userdata.json", 'utf8');
  var users = JSON.parse(data);

  // ADD TO DATA
  users[user_name] = body;
  var result = new Object();
  // SAVE DATA
  fs.writeFileSync(__dirname + "/../../userdata/" + "userdata.json",
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
