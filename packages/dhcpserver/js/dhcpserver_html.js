function savesetting_button() {

  var interface_data = document.getElementById("interface_id").value;
  var starting_IP_address_data = document.getElementById("starting_IP_address_id").value;
  var ending_IP_address_data = document.getElementById("ending_IP_address_id").value;
  var Lease_time_data = document.getElementById("Lease_time_id").value;
  var interval_data = document.getElementById("interval_id").value;

  var obj = new Object();

  obj.interface = interface_data;
  obj.starting_IP_address = starting_IP_address_data;
  obj.ending_IP_address = ending_IP_address_data;
  obj.Lease_time = Lease_time_data;
  obj.interval = interval_data;

  var json_data = JSON.stringify(obj);
  //alert(json_data);
  savesetting_data_send(json_data);
}

function savesetting_data_send(json_data) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("POST", "/api/dhcpserver", true);
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


function rescan_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response; //object 값
      client_list_output(data);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/dhcpserver?type=clientlist");
  xhr.responseType = 'json';
  xhr.send();
}

function client_list_output(data) {
  document.getElementById("client_information_table").innerHTML = dhcpserver_clientlist_data_fill(data);
  i18n_load();
  updateContent_infor();
}


function getTimeStamp(timestamp) {
  var d = new Date(timestamp);

  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

  return s;
}



function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

function dhcpserver_clientlist_data_fill(data) {
  var content = "";
  var type = "";

  content += "<thead><tr><th id=i18_expiretime>Expire time</th><th id=i18_mac>MAC Address</th><th id=i18_ip>IP Address</th><th id=i18_hostname>Host name</th><th id=i18_client_id>Client ID</th></tr></thead>";
  for (var i = 1; i < 5; i++) {
    var a = String(i);
    type = "client_list_";
    type += a;
    content += "<tbody><tr>";
    for (var name in data[type]) {
      if (name == "Expire time") {
        content += "<td>" + getTimeStamp(Number(data[type][name]) * 1000) + "</td>";
      } else {
        content += "<td>" + data[type][name] + "</td>";
      }
    }
    content += "</tr></tbody>";
  }
  return content;
}

function dnsmasq_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response; //object 값
      dnsmasq_output(data);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/dhcpserver?type=dnsmasq");
  xhr.responseType = 'json';
  xhr.send();
}

function dnsmasq_output(data) {
  document.getElementById("interface_decide_id").innerHTML = Dnsmasq_updown(data);
  updateContent_dnsmasq_startstop();
}

function Dnsmasq_updown(data) {
  var content = "<div class='alert alert-success alert-dismissable'>";
  if (data['alert_select']['Dnsmasq is'] == true) {
    content += "<div style=display:inline id=i18_dnsmasq_dec_run>";
    content += "Dnsmasq is ";
    content += "running";
  } else {
    content += "<div style=display:inline id=i18_dnsmasq_dec_stop>";
    content += "Dnsmasq is ";
    content += "stop";
  }
  content += "</div><button type=button class=close data-dismiss=alert aria-hidden=true>x</button>";
  content += "</div>";
  return content;
}

function serversetting_get() { //받아온 데이터를 이용해서 한번더 판단(awk)
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/dhcpserver?type=get", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      interface_option_get(this.response);
      starting_IP_address_select(this.response);
      ending_IP_address_select(this.response);
      lease_time_select(this.response);
      interval_type_option_select(this.response);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send();
}

function starting_IP_address_select(data) {
  var starting_IP_address = data['starting_IP_address'];
  var content = "<label for=code id=i18_starting_ip>Starting IP Address</label>";
  content += "<input type=text class=form-control name=RangeStart id=starting_IP_address_id value=" + starting_IP_address + " />"
  document.getElementById("starting_IP_address_div_id").innerHTML = content;
}

function ending_IP_address_select(data) {
  var ending_IP_address = data['ending_IP_address'];
  var content = "<label for=code id=i18_end_ip>Ending IP Address</label>";
  content += "<input type=text class=form-control name=RangeEnd id=ending_IP_address_id value=" + ending_IP_address + " />"
  document.getElementById("ending_IP_address_div_id").innerHTML = content;
}

function lease_time_select(data) {
  var lease_time = data['Lease_time'];
  var content = "<label for=code id=i18_leasetime>Lease time</label>";
  content += "<input type=text class=form-control name=RangeLeaseTime id=Lease_time_id value=" + lease_time + " />"
  document.getElementById("Lease_time_div_id").innerHTML = content;
}

function interval_type_option_select(data) { //security에서 1번째 항목(타입 항목)
  //alert(JSON.stringify(data));
  var interval_type = {
    'm': 'Minute(s)',
    'h': 'Hour(s)',
    'd': 'Day(s)',
    'i': 'Infinite'
  }
  var interval_type_key = Object.getOwnPropertyNames(interval_type);
  //alert(enc_type_key[0]);
  for (var a = 0; a < Object.keys(interval_type).length; a++) {
    //a = String(a);
    //alert(enc_type[enc_type_key[a]]);
    var op = new Option();
    op.value = interval_type_key[a];
    op.text = interval_type[interval_type_key[a]];
    if (data['interval'] == interval_type_key[a]) {
      op.selected = true;
    } else {
      op.selected = false;
    }
    document.getElementById("interval_id").options.add(op);
  }
}

function interface_option_get(data) { //받아온 데이터를 이용해서 한번더 판단(awk)
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("GET", "/api/dhcpserver?type=awk", true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      interface_option_select(data, this.response);
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
    document.getElementById("interface_id").options.add(op);
  }
}
//stop, start dnsmasq 부분
function init_dnsmasq_stopstart_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      button_input(data);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/dhcpserver?type=dnsstopstart");
  xhr.responseType = 'json';
  xhr.send();
}

function button_input(data) {
  var content = "";
  if (data == 1) {
    content = "<input type=button class='btn btn-outline btn-primary' id=i18_savesetbtn value='Save settings' name=savedhcpdsettings onclick=savesetting_button() />";
    content += "<input type=button class='btn btn-warning' id=i18_stopbtn value='Stop dnsmasq' name='stopdhcpd' onclick=change_dnsmasq_stopstart_button(0) />";
  } else if (data == 0) {
    content = "<input type=button class='btn btn-outline btn-primary' id=i18_savesetbtn value='Save settings' name=savedhcpdsettings onclick=savesetting_button() />";
    content += "<input type=button class='btn btn-success' id=i18_startbtn value='Start dnsmasq' name='stopdhcpd' onclick=change_dnsmasq_stopstart_button(1) />";
  }
  document.getElementById("startstop_button_id").innerHTML = content;
  updateContent_buttoninput();
}

function change_dnsmasq_stopstart_button(select) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      button_input(data['success']);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/dhcpserver?type=dnsstopstart&select=" + select);
  xhr.responseType = 'json';
  xhr.send();
}
