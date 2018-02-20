// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "conf_dhcp": "Configure DHCP",
        "serversetting": "Server settings",
        "clientlist": "Client list",
        "dhcp_server_set": "DHCP server settings",
        "tab_interface": "Interface",
        "interval": "Interval",
        "tab_clientlist": "Client list",
        "rescanbtn": "Rescan",
        "active_dhcp_leases": "Active DHCP leases",
        "dnsmasq_infor_prov": "Information provided by Dnsmasq",
        "tab_clientlist": "Client list",
        "expiretime": "Expire time",
        "client_mac": "MAC Address",
        "client_ip": "IP Address",
        "client_hostname": "Host name",
        "client_id": "Client ID",
        "dnsmasq_dec_run": "Dnsmasq is running",
        "dnsmasq_dec_stop": "Dnsmasq is stop",
        "starting_ip": "Starting IP Address",
        "ending_ip": "Ending IP Address",
        "lease_time": "Lease time",
        "saveset_btn": "Save settings",
        "stop_dns": "Stop dnamasq",
        "start_dns": "Start dnsmasq"
      }
    },
    ko: {
      translation: {
        "conf_dhcp": "DHCP 설정",
        "serversetting": "서버 환경",
        "clientlist": "클라이언트 목록",
        "dhcp_server_set": "DHCP 서버 환경",
        "tab_interface": "인터페이스",
        "interval": "간격",
        "tab_clientlist": "클라이언트 목록",
        "rescanbtn": "재검사",
        "active_dhcp_leases": "DHCP leases 활성화",
        "dnsmasq_infor_prov": "Dnsmasq에서 제공하는 정보입니다.",
        "tab_clientlist": "클라이언트 목록",
        "expiretime": "만료시간",
        "client_mac": "MAC 주소",
        "client_ip": "IP 주소",
        "client_hostname": "기기 이름",
        "client_id": "클라이언트 ID",
        "dnsmasq_dec_run": "Dnsmasq가 실행중입니다.",
        "dnsmasq_dec_stop": "Dnsmasq가 중지되었습니다.",
        "starting_ip": "IP 시작 주소",
        "ending_ip": "IP 끝 주소",
        "lease_time": "임대 시간",
        "saveset_btn": "설정 저장",
        "stop_dns": "Dnsmasq 중지",
        "start_dns": "Dnsmasq 시작"
      }
    }
  }
}, function(err, t) {
  // init set content
  /*updateContent_nav();
  updateContent_infor();*/
});

function updateContent_nav() {


}

function updateContent_infor() {
  document.getElementById('i18_confdhcp').innerHTML = i18next.t('conf_dhcp');

  document.getElementById('i18_serverset').innerHTML = i18next.t('serversetting');
  document.getElementById('i18_clientlist').innerHTML = i18next.t('clientlist');
  document.getElementById('i18_dhcpserver_set').innerHTML = i18next.t('dhcp_server_set');
  document.getElementById('i18_tab_interface').innerHTML = i18next.t('tab_interface');
  document.getElementById('i18_interval').innerHTML = i18next.t('interval');
  document.getElementById('i18_tab_clientlist').innerHTML = i18next.t('tab_clientlist');
  document.getElementById('i18_rescanbtn').innerHTML = i18next.t('rescanbtn');
  document.getElementById('i18_active_dhcp_leases').innerHTML = i18next.t('active_dhcp_leases');
  document.getElementById('i18_dnsmasq_infor_prov').innerHTML = i18next.t('dnsmasq_infor_prov');

  if(document.getElementById('i18_dnsmasq_dec_run') != null) {
    document.getElementById('i18_dnsmasq_dec_run').innerHTML = i18next.t('dnsmasq_dec_run');
  }
  if(document.getElementById('i18_dnsmasq_dec_stop') != null) {
    document.getElementById('i18_dnsmasq_dec_stop').innerHTML = i18next.t('dnsmasq_dec_stop');
  }

}
function updateContent_serversetting(){
  document.getElementById('i18_starting_ip').innerHTML = i18next.t('starting_ip');
  document.getElementById('i18_end_ip').innerHTML = i18next.t('ending_ip');
  document.getElementById('i18_leasetime').innerHTML = i18next.t('lease_time');
}
function updateContent_dnsmasq_startstop(){
  if(document.getElementById('i18_starting_ip') != null) {
    document.getElementById('i18_starting_ip').innerHTML = i18next.t('starting_ip');
  }
  if(document.getElementById('i18_end_ip') != null) {
    document.getElementById('i18_end_ip').innerHTML = i18next.t('ending_ip');
  }
}
function updateContent_clientlist(){
  document.getElementById('i18_expiretime').innerHTML = i18next.t('expiretime');
  document.getElementById('i18_mac').innerHTML = i18next.t('client_mac');
  document.getElementById('i18_ip').innerHTML = i18next.t('client_ip');
  document.getElementById('i18_hostname').innerHTML = i18next.t('client_hostname');
  document.getElementById('i18_client_id').innerHTML = i18next.t('client_id');

}
function updateContent_buttoninput(){
  if(document.getElementById('i18_stopbtn') != null) {
    document.getElementById('i18_stopbtn').value = i18next.t('stop_dns');
  }
  if(document.getElementById('i18_startbtn') != null) {
    document.getElementById('i18_startbtn').value = i18next.t('start_dns');
  }
  document.getElementById('i18_savesetbtn').value = i18next.t('saveset_btn');
}
function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
}

i18next.on('languageChanged', () => {
  updateContent_infor();
  updateContent_clientlist();
  updateContent_buttoninput();
  updateContent_serversetting();
});
