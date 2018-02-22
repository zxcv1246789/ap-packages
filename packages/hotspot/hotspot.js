var fs = require("fs");
var exec = require('child_process').exec,
  child;
const {
  execSync
} = require('child_process');

exports.api_get = function() {
  exports.read_pidof_hostapd();
  let data = fs.readFileSync(__dirname + "/data/" + "hotspotdata.json", 'utf8');
  var hotspotdata = JSON.parse(data); //json text -> json object
  const stdout = execSync("cat /etc/hostapd/hostapd.conf", {
    encoding: 'utf8'
  });

  console.log('hostapd: ' + stdout);
  var arr = stdout.split("\n");
  //console.log('split: ' + arr[0]);
  for (var i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i].split("=");
    console.log('split: ' + arr[i][0] + ", " + arr[i][1]);
  }
  exports.savedata_basic(arr);
  exports.savedata_security(arr);
  exports.savedata_advanced(arr);

  return hotspotdata;
}
exports.read_pidof_hostapd = function() {
  const stdout = execSync("pidof hostapd | wc -l", {
    encoding: 'utf8'
  });
  var data = {}; //오브젝트
  if (stdout[0] == 0) {
    data['HostAPD is'] = false;
  } else if (stdout[0] == 1) {
    data['HostAPD is'] = true;
  }
  var hostapddata = {};
  hostapddata['alert_select'] = data;

  fs.writeFileSync(__dirname + "/data/" + "hotspotdata.json",
    JSON.stringify(hostapddata, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
}
exports.api_get_basic = function() {
  let data = fs.readFileSync(__dirname + "/data/" + "basicdata.json", 'utf8');
  var basicdata = JSON.parse(data); //json text -> json object
  return basicdata;
}
exports.api_get_advanced = function() {
  let data = fs.readFileSync(__dirname + "/data/" + "advanceddata.json", 'utf8');
  var advanceddata = JSON.parse(data); //json text -> json object
  return advanceddata;
}
exports.api_get_security = function() {
  let data = fs.readFileSync(__dirname + "/data/" + "securitydata.json", 'utf8');
  var securitydata = JSON.parse(data); //json text -> json object
  return securitydata;
}
exports.api_get_awk = function() {
  const stdout = execSync("ip -o link show | awk -F': ' '{print $2}'", {
    encoding: 'utf8'
  });
  var arr = stdout.split("\n");
  var awkdata = {}; //오브젝트
  for (var a = 0; a < arr.length; a++) {
    awkdata[a] = arr[a];
  }
  return awkdata;
}

exports.api_get_log = function() {
  let data = fs.readFileSync(__dirname + "/data/" + "hostapd.log", 'utf8');
  console.log(data);
  return data;
}

exports.savedata_basic = function(arr) {
  var basic_data = {}; //오브젝트
  basic_data["type"] = "basic";
  basic_data["interface"] = arr[0][1];
  basic_data["ssid"] = arr[2][1];
  basic_data["wireless_mode"] = arr[3][1];
  basic_data["channel"] = arr[4][1];
  console.log(JSON.stringify(basic_data));
  // SAVE DATA
  fs.writeFileSync(__dirname + "/data/" + "basicdata.json",
    JSON.stringify(basic_data, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
}
exports.savedata_security = function(arr) {
  var security_data = {}; //오브젝트
  security_data["type"] = "security";
  security_data["security_type"] = arr[8][1];
  security_data["encryption_type"] = arr[11][1];
  security_data["psk"] = arr[9][1];
  console.log(JSON.stringify(security_data));
  // SAVE DATA
  fs.writeFileSync(__dirname + "/data/" + "securitydata.json",
    JSON.stringify(security_data, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
}

exports.savedata_advanced = function(arr) {
  var advanced_data = {}; //오브젝트
  advanced_data["type"] = "advanced";
  advanced_data["enable_logging"] = "test";
  advanced_data["country_code"] = "KR";
  console.log(JSON.stringify(advanced_data));
  // SAVE DATA
  fs.writeFileSync(__dirname + "/data/" + "advancedata.json",
    JSON.stringify(advanced_data, null, '\t'), "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
}


exports.api_post_basic = function(json) {
  let result = new Object();
  fs.writeFileSync(__dirname + "/data/" + "basicdata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result.success = 1;
      exports.tmp_file_save();
    })
  return result;
}

exports.api_post_security = function(json) {
  let result = new Object();
  fs.writeFileSync(__dirname + "/data/" + "securitydata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result.success = 1;
      exports.tmp_file_save();
    })
  return result;
}

exports.api_post_advanced = function(json) {
  let result = new Object();
  fs.writeFileSync(__dirname + "/data/" + "advanceddata.json",
    JSON.stringify(json, null, '\t'), "utf8",
    function(err, data) {
      result.success = 1;
      exports.tmp_file_save();
    })
  return result;
}

exports.tmp_file_save = function() {
  var text_tmp = "";
  var basic_data = fs.readFileSync(__dirname + "/data/" + "basicdata.json", 'utf8');
  var security_data = fs.readFileSync(__dirname + "/data/" + "securitydata.json", 'utf8');
  basic_data = JSON.parse(basic_data);
  security_data = JSON.parse(security_data);
  console.log("베이직 : " + basic_data);
  text_tmp += "interface=" + basic_data['interface'] + "\n";
  text_tmp += "driver=nl80211\n";
  text_tmp += "ssid=" + basic_data['ssid'] + "\n";
  text_tmp += "hw_mode=" + basic_data['wireless_mode'] + "\n";
  text_tmp += "channel=" + basic_data['channel'] + "\n";
  text_tmp += "wmm_enabled=0\n";
  text_tmp += "macaddr_acl=0\n";
  text_tmp += "auth_algs=1\n";

  text_tmp += "wpa=" + security_data['security_type'] + "\n";
  text_tmp += "wpa_passphrase=" + security_data['psk'] + "\n";
  text_tmp += "wpa_key_mgmt=WPA-PSK\n";
  text_tmp += "wpa_pairwise=" + security_data['encryption_type'] + "\n";
  text_tmp += "rsn_pairwise=CCMP\n";

  fs.writeFileSync(__dirname + "/data/" + "tmp.txt",
    text_tmp, "utf8",
    function(err, data) {
      result = {
        "success": 1
      };
    })
  const save = execSync('sudo cp ' + __dirname + '/data/tmp.txt /etc/hostapd/hostapd.conf', {
    encoding: 'utf8'
  });
}

exports.start_stopbutton = function() {
  const stdout = execSync("pidof hostapd | wc -l", {
    encoding: 'utf8'
  });
  return stdout;
}

exports.hotspot_stop = function() {
  result = {
    "success": 0
  };
  child = exec("sudo /etc/init.d/hostapd stop", function(error, stdout, stderr) {

  });
  return result;
}
exports.hotspot_start = function() {
  result = {
    "success": 1
  };
  child = exec("sudo /etc/init.d/hostapd start", function(error, stdout, stderr) {

  });
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
