function HostAPD_updown(data) {
  var content = "<div class='alert alert-success alert-dismissable'>";
  if (data['alert_select']['HostAPD is'] == true) {
    content += "<div style=display:inline id=i18_hostapd_dec_run>";
    content += "HostAPD is ";
    content += "running";
  } else {
    content += "<div style=display:inline id=i18_hostapd_dec_stop>";
    content += "HostAPD is ";
    content += "not running";
  }
  content += "</div><button type=button class=close data-dismiss=alert aria-hidden=true>x</button>";
  content += "</div>";
  return content;
}

function data_server_get() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/hotspot?type=get", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      init(this.response);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function init(data) { //hostapd 받는 부분
  document.getElementById("HostAPD_decide_id").innerHTML = HostAPD_updown(data);
  updateContent_hostapd_startstop();
  server_get_basic();
  server_get_security();
  server_get_advanced();
}

function server_get_basic() { //베이직 데이터를 받아옵니다
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/hotspot?type=basic", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      interface_option_get(this.response);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function interface_option_get(data) { //받아온 데이터를 이용해서 한번더 판단(awk)
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/hotspot?type=awk", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      interface_option_select(data, this.response);
      ssid_input_select(data);
      w_mode_option_select(data);
      channel_option_select(data);
      //basic_data_store_button();
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function interface_option_select(data, response) {
  for (var a = 0; a < Object.keys(response).length - 1; a++) {
    a = String(a);
    var op = new Option();
    op.value = response[a];
    op.text = response[a];
    if (data['interface'] == op.value) {
      op.selected = true;
    } else {
      op.selected = false;
    }
    document.getElementById("interfaceid").options.add(op);
  }
}

function ssid_input_select(data) {
  var ssid = data['ssid'];
  var content = "<label for=code>SSID</label>";
  content += "<input type=text class=form-control name=ssid id=ssidid value=" + ssid + " />"
  document.getElementById("div_ssid").innerHTML = content;
}

function w_mode_option_select(data) {
  var wmode = {
    '0': 'a',
    '1': 'b',
    '2': 'g'
  }
  for (var a = 0; a < Object.keys(wmode).length; a++) {
    a = String(a);
    var op = new Option();
    op.value = wmode[a];
    op.text = wmode[a];
    if (data['wireless_mode'] == op.value) {
      op.selected = true;
    } else {
      op.selected = false;
    }
    document.getElementById("w_mode").options.add(op);
  }
}

function channel_option_select(data) {
  var channel = {
    '0': '1',
    '1': '2',
    '2': '3',
    '3': '4',
    '4': '5',
    '5': '6',
    '6': '7',
    '7': '8',
    '8': '9',
    '9': '10',
    '10': '11',
    '11': '12',
    '12': '13',
    '13': '14'
  }
  for (var a = 0; a < Object.keys(channel).length; a++) {
    a = String(a);
    var op = new Option();
    op.value = channel[a];
    op.text = channel[a];
    if (data['channel'] == op.value) {
      op.selected = true;
    } else {
      op.selected = false;
    }
    document.getElementById("channelid").options.add(op);
  }
}

function server_get_security() { //security 데이터를 받아옵니다
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/hotspot?type=security", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      security_type_option_select(this.response);
      enc_type_option_select(this.response);
      PSK_input_select(this.response)
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function security_type_option_select(data) { //security에서 1번째 항목(타입 항목)
  //alert(JSON.stringify(data));
  var s_type = {
    '0': 'WPA',
    '1': 'WPA2',
    '2': 'WPA+WPA2'
  }
  for (var a = 0; a < Object.keys(s_type).length; a++) {
    a = String(a);
    var op = new Option();
    op.value = s_type[a];
    op.text = s_type[a];
    if (data['security_type'] == a) {
      op.selected = true;
    } else {
      op.selected = false;
    }
    document.getElementById("wpaid").options.add(op);
  }
}

function enc_type_option_select(data) { //security에서 1번째 항목(타입 항목)
  //alert(JSON.stringify(data));
  var enc_type = {
    'TKIP': 'TKIP',
    'CCMP': 'CCMP',
    'TKIP CCMP': 'TKIP+CCMP'
  }
  var enc_type_key = Object.getOwnPropertyNames(enc_type);
  //alert(enc_type_key[0]);
  for (var a = 0; a < Object.keys(enc_type).length; a++) {
    //a = String(a);
    //alert(enc_type[enc_type_key[a]]);
    var op = new Option();
    op.value = enc_type[enc_type_key[a]];
    op.text = enc_type[enc_type_key[a]];
    if (data['encryption_type'] == enc_type_key[a]) {
      op.selected = true;
    } else {
      op.selected = false;
    }
    document.getElementById("wpa_pairwiseid").options.add(op);
  }
}

function PSK_input_select(data) {
  var psk = data['psk'];
  var content = "<label for=code id=i18_psk>PSK</label>";
  content += "<input type=text class=form-control id=pskid name=wpa_passphrase value=" + psk + ">"
  document.getElementById("psk_div_id").innerHTML = content;
}

function server_get_advanced() { //security 데이터를 받아옵니다
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/hotspot?type=advanced", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      logging_select(this.response);
      country_select(this.response);
      i18n_load();
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function logging_select(data) {
  var content = "";
  var logcontent = "";
  if (data['enable_logging'] == "1") {
    const xhr = new XMLHttpRequest();
    // by default async
    xhr.open("GET", "/api/hotspot?type=logging", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    //xhr.responseType = 'json';

    xhr.onload = function() {
      if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
        //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
        content += "<div style=display:inline id=i18_enable_logging>";
        content += "Enable Logging";
        content += "</div><input id=logEnable name =logEnable_name type=checkbox class='form-check-input' value=1 checked=checked>";
        logcontent += "<br /><textarea class=logoutput>";
        logcontent += this.responseText;
        logcontent += "</textarea>";
        document.getElementById("logEnable_class").innerHTML = content;
        document.getElementById("logfile_output").innerHTML = logcontent;
      }
    };
    xhr.onerror = function() {
      console.log("confirm");
    };
    xhr.send();
  } else if (data['enable_logging'] == "0") {
    content += "<div style=display:inline id=i18_enable_logging>";
    content += "Enable Logging";
    content += "</div><input id=logEnable name =logEnable_name type=checkbox class='form-check-input' value=1>";
    logcontent += "<br /><div style=display:inline id=i18_log_notenable>Logfile output not enabled</div>";
    document.getElementById("logEnable_class").innerHTML = content;
    document.getElementById("logfile_output").innerHTML = logcontent;
    updateContent_not_logenable();
  }

}

function country_select(data) {
  var country_data = countrydata;
  var cty_type_key = Object.getOwnPropertyNames(country_data);
  //alert(country_data['AF']);
  for (var a = 0; a < Object.keys(country_data).length; a++) {
    //a = String(a);
    //alert(enc_type[enc_type_key[a]]);
    var op = new Option();
    op.value = country_data[cty_type_key[a]];
    op.text = country_data[cty_type_key[a]];
    if (data['country_code'] == cty_type_key[a]) {
      op.selected = true;
    } else {
      op.selected = false;
    }
    document.getElementById("countries").options.add(op);
  }
}

function basic_data_store_button() {
  var tmp_interid = document.getElementById("interfaceid").value;
  var tmp_ssidid = document.getElementById("ssidid").value;
  var tmp_wmid = document.getElementById("w_mode").value;
  var tmp_channelid = document.getElementById("channelid").value;

  var obj = new Object();

  obj.type = "basic";
  obj.interface = tmp_interid;
  obj.ssid = tmp_ssidid;
  obj.wireless_mode = tmp_wmid;
  obj.channel = tmp_channelid;

  obj_text_convert(obj);
}

function security_data_store_button() {
  var tmp_stid = document.getElementById("wpaid").value;
  var tmp_etid = document.getElementById("wpa_pairwiseid").value;
  var tmp_pskid = document.getElementById("pskid").value;

  var obj = new Object();

  obj.type = "security";
  obj.security_type = tmp_stid;
  obj.encryption_type = tmp_etid;
  obj.psk = tmp_pskid;

  obj_text_convert(obj);
}

function advanced_data_store_button() {
  var tmp__ = document.getElementsByName("logEnable_name");
  if (tmp__[0].checked) {
    tmp_logEnable = "1";
  } else {
    tmp_logEnable = "0";
  }
  tmp_countries = document.getElementById("countries").value;

  var obj = new Object();

  obj.type = "advanced";
  obj.enable_logging = tmp_logEnable;
  obj.country_code = tmp_countries;

  obj_text_convert(obj);
}

function obj_text_convert(obj) {
  var json_data = JSON.stringify(obj);
  data_server_send(json_data);
}

function data_server_send(json_data) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("POST", "/api/hotspot", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send(json_data);
}

function init_hotspot_stopstart_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      button_input_basic(data);
      button_input_security(data);
      button_input_advanced(data);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/hotspot?type=wlan0stopstart");
  xhr.responseType = 'json';
  xhr.send();
}

function button_input_basic(data) {
  var content = "";
  if (data == 1) {
    content = "<input type=button class='btn btn-outline btn-primary' name=SaveHostAPDSettings id=i18_basic_savesetbtn value='Save settings' onclick=basic_data_store_button()>";
    content += "<input type=button class='btn btn-warning' name=StopHotspot value='Stop hotspot' id=i18_basic_hotspotstop onclick=change_hotspot_stopstart_button(0)>";
  } else if (data == 0) {
    content = "<input type=button class='btn btn-outline btn-primary' name=SaveHostAPDSettings id=i18_basic_savesetbtn value='Save settings' onclick=basic_data_store_button()>";
    content += "<input type=button class='btn btn-success' name=StopHotspot value='Start hotspot' id=i18_basic_hotspotstart onclick=change_hotspot_stopstart_button(1)>";
  }
  document.getElementById("basic_button").innerHTML = content;
  updateContent_basic_btn();
}

function button_input_security(data) {
  var content = "";
  if (data == 1) {
    content = "<input type=button class='btn btn-outline btn-primary' name=SaveHostAPDSettings id=i18_security_savesetbtn value='Save settings' onclick=security_data_store_button()>";
    content += "<input type=button class='btn btn-warning' name=StopHotspot value='Stop hotspot' id=i18_security_hotspotstop onclick=change_hotspot_stopstart_button(0)>";
  } else if (data == 0) {
    content = "<input type=button class='btn btn-outline btn-primary' name=SaveHostAPDSettings id=i18_security_savesetbtn value='Save settings' onclick=security_data_store_button()>";
    content += "<input type=button class='btn btn-success' name=StopHotspot value='Start hotspot' id=i18_security_hotspotstart onclick=change_hotspot_stopstart_button(1)>";
  }
  document.getElementById("security_button").innerHTML = content;
  updateContent_security_btn();
}

function button_input_advanced(data) {
  var content = "";
  if (data == 1) {
    content = "<input type=button class='btn btn-outline btn-primary' name=SaveHostAPDSettings id=i18_advanced_savesetbtn value='Save settings' onclick=advanced_data_store_button()>";
    content += "<input type=button class='btn btn-warning' name=StopHotspot value='Stop hotspot' id=i18_advanced_hotspotstop onclick=change_hotspot_stopstart_button(0)>";
  } else if (data == 0) {
    content = "<input type=button class='btn btn-outline btn-primary' name=SaveHostAPDSettings id=i18_advanced_savesetbtn value='Save settings' onclick=advanced_data_store_button()>";
    content += "<input type=button class='btn btn-success' name=StopHotspot value='Start hotspot' id=i18_advanced_hotspotstart onclick=change_hotspot_stopstart_button(1)>";
  }
  document.getElementById("advanced_button").innerHTML = content;
  updateContent_advanced_btn();
}

function change_hotspot_stopstart_button(select) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      button_input_basic(data['success']);
      button_input_security(data['success']);
      button_input_advanced(data['success']);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/hotspot?type=wlan0stopstart&select=" + select);
  xhr.responseType = 'json';
  xhr.send();
}
