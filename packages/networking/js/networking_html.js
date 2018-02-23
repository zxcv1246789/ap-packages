function savesetting_button(index) {
  var select = "";
  if (index == 0) { //adapt 결정하는 부분
    select = "eth0";
  } else if (index == 1) {
    select = "wlan0";
  }
  var adapt_ip_address_select = document.getElementsByName(select + "-addresstype");

  var fallback_select = document.getElementsByName(select + "-dhcpfailover");

  var ip_address_data = document.getElementById(select + "-ipaddress").value;
  var subnet_mask_data = document.getElementById(select + "-netmask").value;
  var default_gateway_data = document.getElementById(select + "-gateway").value;
  var dns_server_data = document.getElementById(select + "-dnssvr").value;
  var alternate_dns_server_data = document.getElementById(select + "-dnssvralt").value;

  var obj = new Object();

  for (var i = 0; i < adapt_ip_address_select.length; i++) {
    if (adapt_ip_address_select[i].checked == true) {
      obj.adapt_ip_address_select = adapt_ip_address_select[i].value;
    }
    if (fallback_select[i].checked == true) {
      obj.fallback_select = fallback_select[i].value;
    }
  }

  obj.ip_address = ip_address_data;
  obj.subnet_mask = subnet_mask_data;
  obj.default_gateway = default_gateway_data;
  obj.dns_server = dns_server_data;
  obj.alternate_dns_server = alternate_dns_server_data;

  var json_data = JSON.stringify(obj);
  //alert(json_data);
  savesetting_data_send(json_data, select);
}

function savesetting_data_send(json_data, select) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("POST", "/api/networking?adaptname=" + select, true);
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

function current_setting_eth0_fill(data) {
  var content = "";
  var type = "";

  content += data['current_setting_eth0']['eth0'];
  content += "<broadcast,multicast,up,lower_up></broadcast,multicast,up,lower_up>";
  return content;
}

function current_setting_wlan0_fill(data) {
  var content = "";
  var type = "";

  content += data['current_setting_wlan0']['wlan0'];
  content += "<no-carrier,broadcast,multicast,up></no-carrier,broadcast,multicast,up>";
  return content;
}

function refresh_button(data) {
  document.getElementById("eth0-summary").innerHTML = current_setting_eth0_fill(data);
  document.getElementById("wlan0-summary").innerHTML = current_setting_wlan0_fill(data);
  i18n_load();
}

function Load() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      refresh_button(data);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/networking");
  xhr.responseType = 'json';
  xhr.send();
}
