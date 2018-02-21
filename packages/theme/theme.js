var fs = require("fs");

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
