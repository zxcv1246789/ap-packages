function clientsetting_data_fill(data) {
  var content = "";
  var type = "example_";

    content += "<tr><th></th><th id=i18_ssid>SSID</th><th id=i18_channel>Channel</th><th id=i18_security>Security</th><th id=i18_passphrase>Passphrase</th><th></th></tr>"
    for(var i = 1;i < 5;i++){
      var a = String(i);
      type = "example_";
      type += a;
      content += "<tr><td></td>";
      for (var name in data[type]) {
        content += "<td>" + data[type][name] + "</td>";
      }
      content += "<td></td></tr>";
    }
    return content;
}

function rescan_button() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var data = this.response;
      wpa_infor(data);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/api/wpaconfig");
  xhr.responseType = 'json';
  xhr.send();
}
function wpa_infor(data){
  document.getElementById("client_information").innerHTML = clientsetting_data_fill(data);
  i18n_load();
  updateContent_infor();
}
