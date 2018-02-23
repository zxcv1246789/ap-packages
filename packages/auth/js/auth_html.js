i18n_load();

function server_get_userdata(select) {
  if (select == 1) {
    var username_data = document.getElementById("username_id").value;
    var oldpwd_data = document.getElementById("Oldpassword_id").value;
    var myRe = /[A-Za-z0-9]{8,}/;
    var oldpwd_data_check_Re = myRe.test(oldpwd_data);
    if (username_data == "") {} else if (oldpwd_data == "" || oldpwd_data_check_Re == false) {} else {
      const xhr = new XMLHttpRequest();
      // by default async
      xhr.onload = function() {
        if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
          var data = this.response;
          var admin_check = admin_evaluate(data);
          if (admin_check == true) {
            new_password_box_show();
          } else {}

        }
      };
      xhr.onerror = function() {
        console.log("confirm");
      };
      xhr.open("GET", "/api/auth?id=" + username_data + "&password=" + oldpwd_data);
      xhr.responseType = 'json';
      xhr.send();
    }
  } else if (select == 2) {
    new_password_confirm("admin");
  }
}

function admin_evaluate(data) {
  if (data['check'] = "1") {
    alert("관리자 확인되었습니다.");
    return true;
  } else {
    alert("아이디 혹은 비밀번호가 다릅니다.");
    return false;
  }
}

function new_password_box_show() {
  document.getElementById("user_id_password_input_id").innerHTML = next_password_input_box();
  updateContent_infor();
}

function next_password_input_box() {
  var content = "<p><p><form role=form method=POST>";
  content += "<div class=row>";
  content += "<div class='form-group col-md-4'>";
  content += "<label for=password id=i18_newpwd>New password</label>";
  content += "<input type=password class=form-control name=newpass id=Newpassword_id pattern=[A-Za-z0-9]{8,} title='8자 이상 입력하세요.' required/>";
  content += "</div></div><div class=row>";
  content += "<div class='form-group col-md-4'>";
  content += "<label for=password id=i18_rep_newpwd>Repeat New password</label>";
  content += "<input type=password class=form-control name=newpassagain id=RepeatNewpassword_id pattern=[A-Za-z0-9]{8,} title='8자 이상 입력하세요.' required/>";
  content += "</div></div>";
  content += "<input type=button class='btn btn-outline btn-primary' id=i18_completebtn name='UpdateAdminPassword' value='Save settings' onclick='server_get_userdata(2)' />";
  content += "</form>";
  return content;
}

function new_password_confirm(username) {

  var newpwd_data = document.getElementById("Newpassword_id").value;
  var repeatnewpwd_data = document.getElementById("RepeatNewpassword_id").value;

  var myRe = /[A-Za-z0-9]{8,}/;
  var newpwd_data_check_Re = myRe.test(newpwd_data);
  var repeatnewpwd_data_check_Re = myRe.test(repeatnewpwd_data);

  if (newpwd_data == "" || newpwd_data_check_Re == false) {} else if (repeatnewpwd_data == "" || repeatnewpwd_data_check_Re == false) {} else {

    var password_check = password_equal_decide(newpwd_data, repeatnewpwd_data);
    if (password_check == true) {
      save_pwd_data(newpwd_data, username);
    } else {}
    //alert("Username : " + username_data + "\nOld password : " + oldpwd_data + "\nNew password : " + newpwd_data + "\nRepeat new password : " + repeatnewpwd_data);
  }
}

function password_equal_decide(newpwd_data, repeatnewpwd_data) {
  if (newpwd_data == repeatnewpwd_data) {
    alert("새로운 비밀번호가 같습니다.\n비밀번호를 저장하였습니다.");
    return true;
  } else if (newpwd_data != repeatnewpwd_data) {
    alert("새로운 비밀번호가 다릅니다.");
    return false;
  }
}

function save_pwd_data(newpwd_data, username) {
  var obj = new Object();

  obj.username = username;
  obj.password = newpwd_data;

  var json_data = JSON.stringify(obj);

  pwd_data_send(json_data, username)
}

function pwd_data_send(json_data, username) {
  const xhr = new XMLHttpRequest();
  // by default async
  xhr.open("POST", "/api/auth?id=" + username, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (this.readyState == 4 && this.status == 200) { // onload called even on 404 etc so check the status
      //alert("전송 결과 메시지 : " + JSON.stringify(this.response));
      reload();
    }
  };
  xhr.onerror = function() {
    console.log("confirm");
  };
  xhr.send(json_data);
}

function reload() {
  window.location.reload();
}
