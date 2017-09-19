$(document).ready(function(){
  $('#log-form').submit(formAction);
  $('.btn').click(login);
});

function formAction(e) {
  e.preventDefault();
  login();
}

function login() {
  let id = $('#log-id').val();
  let pwd = $('#log-pwd').val();
  let r = /\S/;
  if(r.test(id) && r.test(pwd)) {
    $('#real-btn').attr("disabled", true);
    $('.btn').addClass("disabled");
    $.ajax({
      url: './controller.php',
      type: 'post',
      dataType: 'json',
      data: {
        logId: id,
        logPwd: pwd
      },
      success: function(data) {
        if(data.S) {
          window.location.href = 'index.html';
        }
        else {
          Materialize.toast(data.R, 2000, 'red-text red lighten-5');
          $('#real-btn').attr("disabled", false);
          $('.btn').removeClass("disabled");
        }
      },
      error: function(jqXHR) {
        console.log('login_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
      }
    });
  } else {
    Materialize.toast('請勿空白', 2000, 'red-text red lighten-5');
  }
}
