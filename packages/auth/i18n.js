// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "conf_auth": "Configure Auth",
        "username": "Username",
        "oldpwd": "Old password",
        "next_btn": "Login",
        "newpwd": "New password",
        "rep_newpwd": "Repeat New password",
        "completebtn": "Save settings",
        "logout": "Logout"
      }
    },
    ko: {
      translation: {
        "conf_auth": "관리자 설정",
        "username": "관리자 이름",
        "oldpwd": "현재 비밀번호",
        "next_btn": "로그인",
        "newpwd": "새 비밀번호",
        "rep_newpwd": "새 비밀번호 확인",
        "completebtn": "비밀번호 저장",
        "logout": "로그아웃"
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
  document.getElementById('i18_confauth').innerHTML = i18next.t('conf_auth');
  document.getElementById('logout').innerHTML = i18next.t('logout');

  if(document.getElementById('i18_username') != null) {
    document.getElementById('i18_username').innerHTML = i18next.t('username');
    document.getElementById('i18_oldpwd').innerHTML = i18next.t('oldpwd');
    document.getElementById('i18_nextbtn').value = i18next.t('next_btn');
  }
  if(document.getElementById('i18_newpwd') != null) {
    document.getElementById('i18_newpwd').innerHTML = i18next.t('newpwd');
    document.getElementById('i18_rep_newpwd').innerHTML = i18next.t('rep_newpwd');
    document.getElementById('i18_completebtn').value = i18next.t('completebtn');
  }
}


function changeLng() {
  var langSelect = document.getElementById("lang_select");
  var selectValue = langSelect.options[langSelect.selectedIndex].value;
  i18next.changeLanguage(selectValue);
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      console.log(this.response);
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/i18n_save?lang=" + selectValue);
  xhr.send();
}

function i18n_load() {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      var check_data = this.response;
      var lang = document.getElementById("lang_select");
      for(var a = 0;a < lang.options.length; a++) {
        if (lang.options[a].value == check_data['language']) {
          lang.options[a].selected = true;
          changeLng();
        }
      }

    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.open("GET", "/i18n_load");
  xhr.responseType = 'json';
  xhr.send();
}

i18next.on('languageChanged', () => {
  updateContent_nav();
  updateContent_infor();
});
