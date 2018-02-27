// import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        "logout": "Logout"
      }
    },
    ko: {
      translation: {
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
  document.getElementById('logout').innerHTML = i18next.t('logout');
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
});
