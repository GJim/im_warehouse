$(document).ready(function(){
  ifLogin();
  gtBg();
  gtNo();
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('select').material_select();
  $('.links').click(linkTo);
  $('.selAll').click(selectAll);
  $('#cip-id').change(initcolm);
  $('#cmp-form').submit(cmgAt);
  $('#cmp-btn').click(ctMg);
  $('#logout').click(logout);
  $('#smg-icon').click(ltMg);
  $('.with-check').on('click', 'tr', ckAt);
  $('#emp-edit-btn').click(edMgMd);
  $('.modal-footer').on('click', '.modal-close', mdAt);
  $('.modal-footer').on('click', '#editMg', edMg);
  $('#emp-del-btn').click(deMgMd);
  $('.modal-footer').on('click', '#delMg', deMg);
  $('#cup-form').submit(curAt);
  $('#cup-btn').click(ctUr);
  $('#bcup-form').submit(bCurAt);
  $('#bcup-btn').click(bCtUr);
  $('#sur-icon').click(ltUr);
  $('#eup-edit-btn').click(edUrMd);
  $('.modal-footer').on('click', '#editUr', edUr);
  $('#eup-del-btn').click(deUrMd);
  $('.modal-footer').on('click', '#delUr', deUr);
  $('#eup-table').on('click', '.release', reUr);
  $('#cip-form').submit(citAt);
  $('#cip-btn').click(ctIt);
  $('#sit-icon').click(ltIt);
  $('#eip-edit-btn').click(edItMd);
  $('.modal-footer').on('click', '#editIt', edIt);
  $('#eip-del-btn').click(deItMd);
  $('.modal-footer').on('click', '#delIt', deIt);
  $('#eip-table').on('click', '.reserve', reIt);
  $('#cnp-form').submit(cnoAt);
  $('#cnp-btn').click(ctNo);
  $('#snt-icon').click(ltNo);
  $('#enp-edit-btn').click(edNoMd);
  $('.modal-footer').on('click', '#editNo', edNo);
  $('#enp-del-btn').click(deNoMd);
  $('.modal-footer').on('click', '#delNo', deNo);
  $('#crp-uid').change(gtUr);
  $('#crp-iid').change(gtIt);
  $('#crp-form').submit(crdAt);
  $('#crp-btn').click(ctRd);
  $('#return-btn').click(rtItMd);
  $('#extend-btn').click(etBdMd);
  $('.modal-footer').on('click', '#returnIt', rtIt);
  $('.modal-footer').on('click', '#extendBd', etBd);
  $('#srd-icon').click(ltRd);
  $('#brp-table').on('click', '.tnbk', tRdBk);
});

//link to the specific function while side nav element clicked
function linkTo() {
  let el = '#'+$(this).attr('id')+'p';
  $('#other > div').hide();
  $(el).show();
}

//initial corresponse input when the id of item change
function initcolm() {
  let id = $(this).val();
  //category: paper
  let r1 = new RegExp("^1[0-9]{5}$");
  //category: book and magazine
  let r21 = new RegExp("^299[0-9]{3}$");
  let r22 = new RegExp("^2[0-3][0-9]{4}$");
  let r23 = new RegExp("^29[0-8][0-9]{3}$");
  //category: notebook body
  let r4 = new RegExp("^3100[0-9]{2}$");
  //category: notebook accessory
  let r5 = new RegExp("^310[1-3][0-9]{2}$");
  //category: pad body
  let r6 = new RegExp("^3200[0-9]{2}$");
  //category: pad accessory
  let r7 = new RegExp("^3201[0-9]{2}$");
  //category: other electric equipment
  let r8 = new RegExp("^3[3-4]0[0-4][0-9]{2}$");
  let r9 = new RegExp("^3[5-6]0[0-2][0-9]{2}$");
  let r10 = new RegExp("^370[0-1][0-9]{2}$");
  let r11 = new RegExp("^38[0-1][0-1][0-9]{2}$");
  let r12 = new RegExp("^390[0-1][0-9]{2}$");
  let r13 = new RegExp("^391[0-2][0-9]{2}$");
  //category: other accessory
  let r14 = new RegExp("^400[0-2][0-9]{2}$");
  let r15 = new RegExp("^410[0-1][0-9]{2}$");
  let r16 = new RegExp("^420[0-5][0-9]{2}$");
  let r17 = new RegExp("^5[0-9]{5}$");

  $('.colm>input').val('');
  $('.colm').hide();

  if(r1.test(id)) {
    $('#cip-colm1').next().text('英文名稱');
    $('#cip-colm1').parent().show();
    $('#cip-colm2').next().text('作者');
    $('#cip-colm2').parent().show();
    $('#cip-colm3').next().text('指導老師');
    $('#cip-colm3').parent().show();
  } else if(r21.test(id)) {
    $('#cip-colm1').next().text('作者');
    $('#cip-colm1').parent().show();
    $('#cip-colm2').next().text('出版社');
    $('#cip-colm2').parent().show();
  } else if(r22.test(id) || r23.test(id)) {
    $('#cip-colm1').next().text('出版社');
    $('#cip-colm1').parent().show();
    $('#cip-colm2').next().text('期別');
    $('#cip-colm2').parent().show();
  } else if(r4.test(id) || r6.test(id)) {
    $('#cip-colm1').next().text('財產編號');
    $('#cip-colm1').parent().show();
    $('#cip-colm2').next().text('廠牌型號');
    $('#cip-colm2').parent().show();
    $('#cip-colm3').next().text('購置日期');
    $('#cip-colm3').parent().show();
  } else if(!(r5.test(id) || r7.test(id) || r8.test(id) || r9.test(id) || r10.test(id)
         || r11.test(id) || r12.test(id) || r13.test(id) || r14.test(id) || r15.test(id)
         || r16.test(id) || r17.test(id))) {
    Materialize.toast('編號格式錯誤', 2000, 'rounded white-text red darken-4');
  }
}

//checkbox action
function ckAt() {
  $(this).find('input').click();
}

//model close
function mdAt() {
  $(this).parent().parent().modal('close');
}

//select All button action
function selectAll() {
  $(this).parent().parent().next().find('input').click();
}

function ifLogin() {
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      ifLogin: 1
    },
    success: function(data) {
      if(data.S) {
        if(data.R == "管理員") {
          $('.authFunc').show();
        }
      }
      else {
        window.location.href = 'index.html';
      }
    },
    error: function(jqXHR) {
      console.log('ifLogin_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

function logout() {
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      logout: 1
    },
    success: function(data) {
      if(data.S) {
        window.location.href = 'index.html';
      }
      else {
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('logout_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//create manager form action
function cmgAt(e) {
  e.preventDefault();
  ctMg();
}

//create manager
function ctMg() {
  let id = $('#cmp-id').val();
  let pwd = $('#cmp-pwd').val();
  let name = $('#cmp-name').val();
  let pos = $('#cmp-pos').val() || "";
  let r1 = new RegExp("[0-9a-zA-Z]+");
  let r2 = /\S/;
  if(r1.test(id) && r2.test(pwd) && r2.test(name) && r2.test(pos)) {
    $('#r-cmp-btn').attr("disabled", true);
    $('#cmp-btn').addClass("disabled");
    $.ajax({
      url: './controller.php',
      type: 'post',
      dataType: 'json',
      data: {
        cmgId: id,
        cmgPwd: pwd,
        cmgName: name,
        cmgPos: pos
      },
      success: function(data) {
        if(data.S) {
          $('#cmp-id').val('');
          $('#cmp-pwd').val('');
          $('#cmp-name').val('');
          Materialize.toast(data.R, 2000, 'rounded white-text blue darken-4');
        }
        else {
          Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
        }
        $('#r-cmp-btn').attr("disabled", false);
        $('#cmp-btn').removeClass("disabled");
      },
      error: function(jqXHR) {
        console.log('createMg_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
      }
    });
  } else {
    Materialize.toast('資料格式錯誤', 2000, 'rounded white-text red darken-4');
  }
}

//list manager
function ltMg() {
  let key = $('#smg').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      ltMgKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.emp-elm').show();
        $('#emp-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.name + '</td><td>' + v.position + '</td><td hidden>'+v.password+'</td>');
          $('#emp-table table tbody').append(tr);
        });
      }
      else {
        $('.emp-elm').hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('ltMg_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//edit manager modal
function edMgMd() {
  let id = $('#emp-table table tbody input:checked').parent().next();
  let name = id.next();
  let pos = name.next();
  let pwd = pos.next();
  if(id.length > 0) {
    $('#emp-modal-table table').show();
    $('#emp-modal-table p').hide();
    $('#emp-modal-table>table>tbody').html('');
    for(let i=0; i<id.length; i++) {
      $('#emp-modal-table>table>tbody').append('<tr><td class="emp-id">'+id[i].textContent+'</td><td><input value="'+name[i].textContent+'" type="text" class="emp-name"></td><td><input value="'+pwd[i].textContent+'" type="text" class="emp-pwd"></td></tr>');
    }
    $('#emp-modal').modal('open');
    $('#emp-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="editMg" class="modal-action modal-close waves-effect waves-green btn-flat">修改</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//edit manager
function edMg() {
  let id = $('.emp-id');
  let name = $('.emp-name');
  let pwd = $('.emp-pwd');
  let key = $('#smg').val();
  let emid = "";
  let emname = "";
  let empwd = "";
  for(let i=0; i<id.length; i++) {
    emid += ','+id[i].textContent;
    emname += ','+name[i].value;
    empwd += ','+pwd[i].value;
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      edMgId: emid.substring(1),
      edMgName: emname.substring(1),
      edMgPwd: empwd.substring(1),
      edMgKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.emp-elm').show();
        $('#emp-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.name + '</td><td>' + v.position + '</td><td hidden>'+v.password+'</td>');
          $('#emp-table table tbody').append(tr);
        });
        Materialize.toast('修改完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('#emp-table').parent().hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('edMg_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//delete manager modal
function deMgMd() {
  let id = $('#emp-table table tbody input:checked').parent().next();
  let name = id.next();
  let pos = name.next();
  if(id.length > 0) {
    $('#emp-modal-table table').hide();
    $('#emp-modal-table p').show();
    let str = '';
    str += '<p>你確定要刪除下列項目';
    for(let i=0; i<id.length; i++) {
      str += ',<span id="'+id[i].textContent+'" class="emp-id red-text">'+name[i].textContent+pos[i].textContent+'</span>';
    }
    str += '嗎?</p>';
    $('.emp-del-msg').html(str);
    $('#emp-modal').modal('open');
    $('#emp-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="delMg" class="modal-action modal-close waves-effect waves-green btn-flat">刪除</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//delete manager
function deMg() {
  let id = $('.emp-id');
  let key = $('#smg').val();
  let emid = "";
  for(let i=0; i<id.length; i++) {
    emid += ','+id[i].id;
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      deMgId: emid.substring(1),
      deMgKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.emp-elm').show();
        $('#emp-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.name + '</td><td>' + v.position + '</td><td hidden>'+v.password+'</td>');
          $('#emp-table table tbody').append(tr);
        });
        Materialize.toast('刪除完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('#emp-table').parent().hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('deMg_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//create user form action
function curAt(e) {
  e.preventDefault();
  ctUr();
}

//create user
function ctUr() {
  let id = $('#cup-id').val();
  let name = $('#cup-name').val();
  let num = $('#cup-num').val();
  let pos = $('#cup-pos').val() || "";
  let dep = $('#cup-dep').val()|| "";
  let r1 = new RegExp("[0-9]+");
  let r2 = /\S/;
  let r3 = new RegExp("^09[0-9]{8}$");
  if(r1.test(id) && r2.test(name) && r3.test(num) && r2.test(pos) && r2.test(dep)) {
    $('#r-cup-btn').attr("disabled", true);
    $('#cup-btn').addClass("disabled");
    $.ajax({
      url: './controller.php',
      type: 'post',
      dataType: 'json',
      data: {
        curId: id,
        curName: name,
        curNum: num,
        curPos: pos,
        curDep: dep
      },
      success: function(data) {
        if(data.S) {
          $('#cup-id').val('');
          $('#cup-num').val('');
          $('#cup-name').val('');
          Materialize.toast(data.R, 2000, 'rounded white-text blue darken-4');
        }
        else {
          Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
        }
        $('#r-cup-btn').attr("disabled", false);
        $('#cup-btn').removeClass("disabled");
      },
      error: function(jqXHR) {
        console.log('createUr_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
      }
    });
  } else {
    Materialize.toast('資料格式錯誤', 2000, 'rounded white-text red darken-4');
  }
}

//create user form action
function bCurAt(e) {
  e.preventDefault();
  bCtUr();
}

//create user
function bCtUr() {
  let content = $('#bcup-data').val();
  content = content.split(/\n/g);
  let r1 = new RegExp("[0-9]+");
  let r2 = /\S/;
  let r3 = new RegExp("^09[0-9]{8}$");
  let cuid = "";
  let cuname = "";
  let cunum = "";
  let cupos = "";
  let cudep = "";
  for (let i = 0; i < content.length; i++) {
    let arr = content[i].split(/\t/g);
    let id = arr[0];
    let name = arr[1];
    let num = arr[2];
    let pos = arr[3];
    let dep = arr[4];
    if(r1.test(id) && r2.test(name) && r3.test(num) && r2.test(pos) && r2.test(dep)) {
      cuid += ','+arr[0];
      cuname += ','+arr[1];
      cunum += ','+arr[2];
      cupos += ','+arr[3];
      cudep += ','+arr[4];
    }
  }
  if(cuid != "") {
    $('#r-bcup-btn').attr("disabled", true);
    $('#bcup-btn').addClass("disabled");
    $.ajax({
      url: './controller.php',
      type: 'post',
      dataType: 'json',
      data: {
        baCurId: cuid.substring(1),
        baCurName: cuname.substring(1),
        baCurNum: cunum.substring(1),
        baCurPos: cupos.substring(1),
        baCurDep: cudep.substring(1)
      },
      success: function(data) {
        if(data.S) {
          $('#bcup-data').val('');
          Materialize.toast(data.R, 2000, 'rounded white-text blue darken-4');
        }
        else {
          Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
        }
        $('#r-bcup-btn').attr("disabled", false);
        $('#bcup-btn').removeClass("disabled");
      },
      error: function(jqXHR) {
        console.log('batchCreateUr_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
      }
    });
  } else {
    Materialize.toast('資料格式錯誤', 2000, 'rounded white-text red darken-4');
  }
}

//list user
function ltUr() {
  let key = $('#sur').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      ltUrKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.eup-elm').show();
        $('#eup-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.name + '</td><td>' + v.department + '</td><td>' + v.phone + '</td><td>' + v.status + '</td>');
          (v.status == '封鎖中' && v.pos == '管理員') ? tr.append('<td><a class="waves-effect waves-light light-blue btn release">解鎖</a></td>') : tr.append('<td></td>');
          $('#eup-table table tbody').append(tr);
        });
      }
      else {
        $('.eup-elm').hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('ltUr_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//edit user modal
function edUrMd() {
  let id = $('#eup-table table tbody input:checked').parent().next();
  let name = id.next();
  let dep = name.next();
  let num = dep.next();
  if(id.length > 0) {
    $('#eup-modal-table table').show();
    $('#eup-modal-table p').hide();
    $('#eup-modal-table>table>tbody').html('');
    for(let i=0; i<id.length; i++) {
      $('#eup-modal-table>table>tbody').append('<tr><td class="eup-id">'+id[i].textContent+'</td><td><input value="'
      +name[i].textContent+'" type="text" class="eup-name"></td><td><select id="eup-dep'+i.toString()+'">'
      +'<option value="資訊管理學系">資訊管理學系</option><option value="財務金融學系">財務金融學系</option>'
      +'<option value="國際企業學系">國際企業學系</option><option value="經濟學系">經濟學系</option>'
      +'<option value="觀光休閒與餐旅管理學系">觀光休閒與餐旅管理學系</option><option value="中國語文學系">中國語文學系</option>'
      +'<option value="外國語文學系">外國語文學系</option><option value="社會政策與社會工作學系">社會政策與社會工作學系</option>'
      +'<option value="公共行政與政策學系">公共行政與政策學系</option><option value="歷史學系">歷史學系</option>'
      +'<option value="東南亞學系">東南亞學系</option><option value="土木工程學系">土木工程學系</option>'
      +'<option value="資訊工程學系">資訊工程學系</option><option value="電機工程學系">電機工程學系</option>'
      +'<option value="應用化學系">應用化學系</option><option value="國際文教與比較教育學系">國際文教與比較教育學系</option>'
      +'<option value="教育政策與行政學系">教育政策與行政學系</option></select>'
      +'</td><td><input value="'+num[i].textContent+'" type="text" class="eup-num"></td></tr>');
      $('#eup-dep'+i.toString()).val(dep[i].textContent);
    }
    $('select').material_select()
    $('#eup-modal').modal('open');
    $('#eup-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="editUr" class="modal-action modal-close waves-effect waves-green btn-flat">修改</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//edit user
function edUr() {
  let id = $('.eup-id');
  let name = $('.eup-name');
  let pwd = $('.eup-num');
  let key = $('#sur').val();
  let euid = "";
  let euname = "";
  let eunum = "";
  let eudep = "";
  for(let i=0; i<id.length; i++) {
    euid += ','+id[i].textContent;
    euname += ','+name[i].value;
    eunum += ','+pwd[i].value;
    eudep += ','+$('#eup-dep'+i.toString()).val();
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      edUrId: euid.substring(1),
      edUrName: euname.substring(1),
      edUrNum: eunum.substring(1),
      edUrDep: eudep.substring(1),
      edUrKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.eup-elm').show();
        $('#eup-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.name + '</td><td>' + v.department + '</td><td>' + v.phone + '</td><td>' + v.status + '</td>');
          (v.status == '封鎖中' && v.pos == '管理員') ? tr.append('<td><a class="waves-effect waves-light light-blue btn release">解鎖</a></td>') : tr.append('<td></td>');
          $('#eup-table table tbody').append(tr);
        });
        Materialize.toast('修改完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('#eup-table').parent().hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('edUr_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//release user
function reUr() {
  let id = $(this).parent().parent().find('td:eq( 1 )').text();
  let key = $('#sur').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      reUrId: id,
      reUrKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.eup-elm').show();
        $('#eup-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.name + '</td><td>' + v.department + '</td><td>' + v.phone + '</td><td>' + v.status + '</td>');
          (v.status == '封鎖中' && v.pos == '管理員') ? tr.append('<td><a class="waves-effect waves-light light-blue btn release">解鎖</a></td>') : tr.append('<td></td>');
          $('#eup-table table tbody').append(tr);
        });
        Materialize.toast('解除完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('#eup-table').parent().hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('reUr_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//delete user modal
function deUrMd() {
  let id = $('#eup-table table tbody input:checked').parent().next();
  let name = id.next();
  if(id.length > 0) {
    $('#eup-modal-table table').hide();
    $('#eup-modal-table p').show();
    let str = '';
    str += '<p>你確定要刪除下列項目';
    for(let i=0; i<id.length; i++) {
      str += ',<span id="'+id[i].textContent+'" class="eup-id red-text">'+name[i].textContent+'</span>';
    }
    str += '嗎?</p>';
    $('.eup-del-msg').html(str);
    $('#eup-modal').modal('open');
    $('#eup-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="delUr" class="modal-action modal-close waves-effect waves-green btn-flat">刪除</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//delete user
function deUr() {
  let id = $('.eup-id');
  let key = $('#sur').val();
  let euid = "";
  for(let i=0; i<id.length; i++) {
    euid += ','+id[i].id;
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      deUrId: euid.substring(1),
      deUrKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.eup-elm').show();
        $('#eup-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.name + '</td><td>' + v.department + '</td><td>' + v.phone + '</td><td>' + v.status + '</td>');
          (v.status == '封鎖中' && v.pos == '管理員') ? tr.append('<td><a class="waves-effect waves-light light-blue btn release">解鎖</a></td>') : tr.append('<td></td>');
          $('#eup-table table tbody').append(tr);
        });
        Materialize.toast('刪除完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('#eup-table').parent().hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('deUr_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//create item form action
function citAt(e) {
  e.preventDefault();
  ctIt();
}

//create item
function ctIt() {
  let id = $('#cip-id').val();
  let name = $('#cip-name').val();
  let colm1 = $('#cip-colm1').val();
  let colm2 = $('#cip-colm2').val();
  let colm3 = $('#cip-colm3').val();
  let cls = "";
  let cf = classify();
  let vld = true;
  switch (cf.t) {
    case 1:
      cls = cf.c;
      break;
    case 2:
      cls = cf.c;
      colm3 = "";
      break;
    case 3:
      cls = cf.c;
      colm1 = "";
      colm2 = "";
      colm3 = "";
      break;
    default:
      vld = false;
  }
  if(vld) {
    $('#r-cip-btn').attr("disabled", true);
    $('#cip-btn').addClass("disabled");
    $.ajax({
      url: './controller.php',
      type: 'post',
      dataType: 'json',
      data: {
        citId: id,
        citName: name,
        citCat: cls,
        citCol1: colm1,
        citCol2: colm2,
        citCol3: colm3
      },
      success: function(data) {
        if(data.S) {
          $('#cip-id').val('');
          $('#cip-name').val('');
          $('#cip-colm1').val('');
          $('#cip-colm2').val('');
          $('#cip-colm3').val('');
          Materialize.toast(data.R, 2000, 'rounded white-text blue darken-4');
        }
        else {
          Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
        }
        $('#r-cip-btn').attr("disabled", false);
        $('#cip-btn').removeClass("disabled");
      },
      error: function(jqXHR) {
        console.log('ctIt_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
      }
    });
  } else {
    Materialize.toast('資料格式錯誤', 2000, 'rounded white-text red darken-4');
  }
}

//list item
function ltIt() {
  let key = $('#sit').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      ltItKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.eip-elm').show();
        $('#eip-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.category + '</td><td>' + v.name + '</td><td>' + v.status + '</td><td hidden>' + v.colm1 + '</td><td hidden>' + v.colm2 + '</td><td hidden>' + v.colm3 + '</td>');
          (v.status == '存貨中') ? tr.append('<td><a class="waves-effect waves-light light-blue btn reserve">保留</a></td>') : (v.status == '保留中') ? tr.append('<td><a class="waves-effect waves-light light-green accent-3 btn reserve">還原</a></td>') : tr.append('<td></td>');
          $('#eip-table table tbody').append(tr);
        });
      }
      else {
        $('.eip-elm').hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('ltIt_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//edit item modal
function edItMd() {
  let id = $('#eip-table table tbody input:checked').parent().next();
  let name = id.next().next();
  let status = name.next();
  let col1 = name.next().next();
  let col2 = col1.next();
  let col3 = col2.next();
  //category: paper
  let r1 = new RegExp("^1[0-9]{5}$");
  //category: book and magazine
  let r21 = new RegExp("^299[0-9]{3}$");
  let r22 = new RegExp("^2[0-3][0-9]{4}$");
  let r23 = new RegExp("^29[0-8][0-9]{3}$");
  //category: notebook body
  let r3 = new RegExp("^3100[0-9]{2}$");
  //category: pad body
  let r4 = new RegExp("^3200[0-9]{2}$");
  if(id.length > 0) {
    $('#eip-modal-table table').show();
    $('#eip-modal-table p').hide();
    $('#eip-modal-table>table>tbody').html('');
    for(let i=0; i<id.length; i++) {
      if(r1.test(id[i].textContent)) {
        $('#eip-modal-table>table>tbody').append('<tr><td class="eip-id">'+id[i].textContent+'</td><td><input value="'
        +name[i].textContent+'" type="text" class="eip-name"></td><td><input value="'
        +col1[i].textContent+'" type="text" class="eip-col1"></td><td><input value="'
        +col2[i].textContent+'" type="text" class="eip-col2"></td><td><input value="'
        +col3[i].textContent+'" type="text" class="eip-col3"></td><td></td><td></td><td></td><td></td><td></td></tr>');
      } else if (r21.test(id[i].textContent)) {
        $('#eip-modal-table>table>tbody').append('<tr><td class="eip-id">'+id[i].textContent+'</td><td><input value="'
        +name[i].textContent+'" type="text" class="eip-name"></td><td></td><td><input value="'
        +col1[i].textContent+'" type="text" class="eip-col1"></td><td></td><td><input value="'
        +col2[i].textContent+'" type="text" class="eip-col2"></td><td><input value="" type="text" class="eip-col3" hidden></td>'
        +'<td></td><td></td><td></td></tr>');
      } else if (r22.test(id[i].textContent) || r23.test(id[i].textContent)) {
        $('#eip-modal-table>table>tbody').append('<tr><td class="eip-id">'+id[i].textContent+'</td><td><input value="'
        +name[i].textContent+'" type="text" class="eip-name"></td><td></td><td></td><td></td><td><input value="'
        +col1[i].textContent+'" type="text" class="eip-col1"></td><td><input value="'
        +col2[i].textContent+'" type="text" class="eip-col2"></td><td><input value="" type="text" class="eip-col3" hidden></td>'
        +'<td></td><td></td></tr>');
      } else if(r3.test(id[i].textContent) || r4.test(id[i].textContent)) {
        $('#eip-modal-table>table>tbody').append('<tr><td class="eip-id">'+id[i].textContent+'</td><td><input value="'
        +name[i].textContent+'" type="text" class="eip-name"></td><td></td><td></td><td></td><td></td><td></td><td><input value="'
        +col1[i].textContent+'" type="text" class="eip-col1"></td><td><input value="'
        +col2[i].textContent+'" type="text" class="eip-col2"></td><td><input value="'
        +col3[i].textContent+'" type="text" class="eip-col3"></td></tr>');
      } else {
        $('#eip-modal-table>table>tbody').append('<tr><td class="eip-id">'+id[i].textContent+'</td><td><input value="'
        +name[i].textContent+'" type="text" class="eip-name"></td>'
        +'<td><input value="" type="text" class="eip-col1" hidden></td>'
        +'<td><input value="" type="text" class="eip-col2" hidden></td>'
        +'<td><input value="" type="text" class="eip-col3" hidden></td><td></td><td></td><td></td><td></td><td></td></tr>');
      }
    }
    $('#eip-modal').modal('open');
    $('#eip-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="editIt" class="modal-action modal-close waves-effect waves-green btn-flat">修改</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//edit item
function edIt() {
  let id = $('.eip-id');
  let name = $('.eip-name');
  let col1 = $('.eip-col1');
  let col2 = $('.eip-col2');
  let col3 = $('.eip-col3');
  let key = $('#sit').val();
  let eiid = "";
  let einame = "";
  let eicol1 = "";
  let eicol2 = "";
  let eicol3 = "";
  for(let i=0; i<id.length; i++) {
    eiid += ','+id[i].textContent;
    einame += ','+name[i].value;
    eicol1 += ','+col1[i].value;
    eicol2 += ','+col2[i].value;
    eicol3 += ','+col3[i].value;
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      edItId: eiid.substring(1),
      edItName: einame.substring(1),
      edItCol1: eicol1.substring(1),
      edItCol2: eicol2.substring(1),
      edItCol3: eicol3.substring(1),
      edItKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.eip-elm').show();
        $('#eip-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.category + '</td><td>' + v.name + '</td><td>' + v.status + '</td><td hidden>' + v.colm1 + '</td><td hidden>' + v.colm2 + '</td><td hidden>' + v.colm3 + '</td>');
          (v.status == '存貨中') ? tr.append('<td><a class="waves-effect waves-light light-blue btn reserve">保留</a></td>') : (v.status == '保留中') ? tr.append('<td><a class="waves-effect waves-light light-green accent-3 btn reserve">還原</a></td>') : tr.append('<td></td>');
          $('#eip-table table tbody').append(tr);
        });
        Materialize.toast('修改完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('#eip-table').parent().hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('edIt_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//reserve item
function reIt() {
  let id = $(this).parent().parent().find('td:eq( 1 )').text();
  let sts = $(this).parent().parent().find('td:eq( 4 )').text();
  let key = $('#sit').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      reItId: id,
      reItSts: sts,
      reItKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.eip-elm').show();
        $('#eip-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.category + '</td><td>' + v.name + '</td><td>' + v.status + '</td><td hidden>' + v.colm1 + '</td><td hidden>' + v.colm2 + '</td><td hidden>' + v.colm3 + '</td>');
          (v.status == '存貨中') ? tr.append('<td><a class="waves-effect waves-light light-blue btn reserve">保留</a></td>') : (v.status == '保留中') ? tr.append('<td><a class="waves-effect waves-light light-green accent-3 btn reserve">還原</a></td>') : tr.append('<td></td>');
          $('#eip-table table tbody').append(tr);
        });
        Materialize.toast('修改完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('#eip-table').parent().hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('reIt_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//delete item modal
function deItMd() {
  let id = $('#eip-table table tbody input:checked').parent().next();
  let name = id.next().next();
  if(id.length > 0) {
    $('#eip-modal-table table').hide();
    $('#eip-modal-table p').show();
    let str = '';
    str += '<p>你確定要刪除下列項目';
    for(let i=0; i<id.length; i++) {
      str += ',<span id="'+id[i].textContent+'" class="eip-id red-text">'+name[i].textContent+'</span>';
    }
    str += '嗎?</p>';
    $('.eip-del-msg').html(str);
    $('#eip-modal').modal('open');
    $('#eip-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="delIt" class="modal-action modal-close waves-effect waves-green btn-flat">刪除</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//delete item
function deIt() {
  let id = $('.eip-id');
  let key = $('#sit').val();
  let eiid = "";
  for(let i=0; i<id.length; i++) {
    eiid += ','+id[i].id;
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      deItId: eiid.substring(1),
      deItKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.eip-elm').show();
        $('#eip-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.category + '</td><td>' + v.name + '</td><td>' + v.status + '</td><td hidden>' + v.colm1 + '</td><td hidden>' + v.colm2 + '</td><td hidden>' + v.colm3 + '</td>');
          (v.status == '存貨中') ? tr.append('<td><a class="waves-effect waves-light light-blue btn reserve">保留</a></td>') : (v.status == '保留中') ? tr.append('<td><a class="waves-effect waves-light light-green accent-3 btn reserve">還原</a></td>') : tr.append('<td></td>');
          $('#eip-table table tbody').append(tr);
        });
        Materialize.toast('刪除完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('#eip-table').parent().hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('deIt_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//get user current status
function gtUr() {
  let id = $('#crp-uid').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      getUrId: id
    },
    success: function(data) {
      if(data.S) {
        $('#crp-uName').text(data.R.uName);
        $('#crp-pos').text(data.R.pos);
        $('.checklist').show();
        $('#crp-user').show();
      }
      else {
        $('#crp-user').hide();
        $('#crp-uName').text('');
        $('#crp-pos').text('');
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('gtUr_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//get item current status
function gtIt() {
  let id = $('#crp-iid').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      getItId: id
    },
    success: function(data) {
      if(data.S) {
        $('#crp-cat').text(data.R.cat);
        $('#crp-iName').text(data.R.iName);
        $('#crp-iSts').text(data.R.iSts);
        $('.checklist').show();
        $('#crp-item').show();
      }
      else {
        $('#crp-item').hide();
        $('#crp-cat').text('');
        $('#crp-iName').text('');
        $('#crp-iSts').text('');
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('gtIt_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//borrow item form action
function crdAt(e) {
  e.preventDefault();
  ctRd();
}

//borrow item
function ctRd() {
  let iid = $('#crp-iid').val();
  let uid = $('#crp-uid').val();
  let card = $('#crp-card').val();
  let day = $('#crp-day').val();
  if(day > 0 && $('#crp-uName').text() != "" && $('#crp-iName').text() != "") {
    $.ajax({
      url: './controller.php',
      type: 'post',
      dataType: 'json',
      data: {
        crpUid: uid,
        crpIid: iid,
        crpCard: card,
        crpDay: day
      },
      success: function(data) {
        if(data.S) {
          $('#crp-item').hide();
          $('#crp-user').hide();
          $('.checklist').hide();
          $('#crp-iid').val('');
          $('.bw-elm').show();
          $('#borrowing table tbody').html('');
          $.each(data.R, function(i, v) {
            var tr = $('<tr></tr>');
            let rd = (v.df >= 0) ?  '<td>'+v.df+'天</td>' : '<td class="red-text">遲還'+(-v.df)+'天</td>';
            tr.append('<td><input id="' + v.no + '" class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.cat + '</td><td>' + v.ina + '</td><td>' + v.una + '</td><td>' + v.card + '</td><td hidden>' + v.pos + '</td>' + rd);
            $('#borrowing table tbody').append(tr);
          });
          Materialize.toast('借閱成功', 2000, 'rounded white-text blue darken-4');
        }
        else {
          Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
        }
      },
      error: function(jqXHR) {
        console.log('ctRd_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
      }
    });
  } else {
    Materialize.toast('資料格式錯誤', 2000, 'rounded white-text red darken-4');
  }
}

//extend the borrow date
function etBdMd() {
  let no = $('#borrowing table tbody input:checked');
  let id = no.parent().next();
  let cat = id.next();
  let name = cat.next().next();
  let pos = name.next().next();
  if(no.length > 0) {
    $('#bw-modal-table table').show();
    $('#bw-modal-table p').hide();
    $('#bw-modal-table>table>tbody').html('');
    for(let i=0; i<id.length; i++) {
      $('#bw-modal-table>table>tbody').append('<tr><td class="bw-no" hidden>'+no[i].id+'</td><td class="bw-id">'+id[i].textContent+'</td><td class="bw-cat">'+cat[i].textContent+'</td><td class="bw-pos" hidden>'+pos[i].textContent+'</td><td>'+name[i].textContent+'</td><td><input value="1" type="text" class="bw-day"></td></tr>');
    }
    $('#bw-modal').modal('open');
    $('#bw-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="extendBd" class="modal-action modal-close waves-effect waves-green btn-flat">續借</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//extend the borrow date
function etBd() {
  let no = $('.bw-no');
  let cat = $('.bw-cat');
  let day = $('.bw-day');
  let pos = $('.bw-pos');
  let nos = "";
  let cats = "";
  let days = "";
  let poss = "";
  for(let i=0; i<no.length; i++) {
    nos += ','+no[i].textContent;
    cats += ','+cat[i].textContent;
    poss += ','+pos[i].textContent;
    days += ','+day[i].value;
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      etNo: nos.substring(1),
      etCat: cats.substring(1),
      etPos: poss.substring(1),
      etDay: days.substring(1)
    },
    success: function(data) {
      if(data.S) {
        $('.bw-elm').show();
        $('#borrowing table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          let rd = (v.df >= 0) ?  '<td>'+v.df+'天</td>' : '<td class="red-text">遲還'+(-v.df)+'天</td>';
          tr.append('<td><input id="' + v.no + '" class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.cat + '</td><td>' + v.ina + '</td><td>' + v.una + '</td><td>' + v.card + '</td><td hidden>' + v.pos + '</td>' + rd);
          $('#borrowing table tbody').append(tr);
        });
        Materialize.toast('續借成功', 2000, 'rounded white-text blue darken-4');
      }
      else {
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('etBd_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//get borrowing record
function gtBg() {
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      gtBg: 1
    },
    success: function(data) {
      if(data.S) {
        $('.bw-elm').show();
        $('#borrowing table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          let rd = (v.df >= 0) ?  '<td>'+v.df+'天</td>' : '<td class="red-text">遲還'+(-v.df)+'天</td>';
          tr.append('<td><input id="' + v.no + '" class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.cat + '</td><td>' + v.ina + '</td><td>' + v.una + '</td><td>' + v.card + '</td><td hidden>' + v.pos + '</td>' + rd);
          $('#borrowing table tbody').append(tr);
        });
      }
    },
    error: function(jqXHR) {
      console.log('gtBg_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//return item modal
function rtItMd() {
  let no = $('#borrowing table tbody input:checked');
  let id = no.parent().next();
  let name = id.next().next();
  if(no.length > 0) {
    $('#bw-modal-table table').hide();
    $('#bw-modal-table p').show();
    let str = '';
    str += '<p>你確定要歸還下列項目';
    for(let i=0; i<no.length; i++) {
      str += ',<span id="'+no[i].id+'" class="rt-no red-text">['+id[i].textContent+']'+name[i].textContent+'</span>';
    }
    str += '嗎?</p>';
    $('.bw-del-msg').html(str);
    $('#bw-modal').modal('open');
    $('#bw-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="returnIt" class="modal-action modal-close waves-effect waves-green btn-flat">歸還</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//return item
function rtIt() {
  let no = $('.rt-no');
  let nos = "";
  for(let i=0; i<no.length; i++) {
    nos += ','+no[i].id;
  }

  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      rtNo: nos.substring(1)
    },
    success: function(data) {
      if(data.S) {
        $('.bw-elm').show();
        $('#borrowing table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          let rd = (v.df >= 0) ?  '<td>'+v.df+'天</td>' : '<td class="red-text">遲還'+(-v.df)+'天</td>';
          tr.append('<td><input id="' + v.no + '" class="filled-in" type="checkbox"/><label></label></td><td>' + v.id + '</td><td>' + v.cat + '</td><td>' + v.ina + '</td><td>' + v.una + '</td><td>' + v.card + '</td><td hidden>' + v.pos + '</td>' + rd);
          $('#borrowing table tbody').append(tr);
        });
        Materialize.toast('歸還成功', 2000, 'rounded white-text blue darken-4');
      }
      else {
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('rtIt_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//list record
function ltRd() {
  let key = $('#srd').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      ltRdKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.brp-elm').show();
        $('#brp-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td hidden>' + v.no + '</td><td>' + v.mna + '</td><td>' + v.una + '</td><td>' + v.ina + '</td><td>' + v.rts + '</td><td>' + v.bd + '</td><td>' + v.rd + '</td>');
          (v.rts == '已歸還' && v.sts == '存貨中') ? tr.append('<td><a class="waves-effect waves-light light-blue btn tnbk">復原</a></td>') : tr.append('<td></td>');
          $('#brp-table table tbody').append(tr);
        });
      }
      else {
        $('.brp-elm').hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('ltRd_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//turn record back
function tRdBk() {
  let no = $(this).parent().parent().find('td:hidden').text();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      tbNo: no
    },
    success: function(data) {
      if(data.S) {
        ltRd();
        gtBg();
        Materialize.toast(data.R, 2000, 'rounded white-text blue darken-4');
      }
      else {
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('rtIt_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//create note form action
function cnoAt(e) {
  e.preventDefault();
  ctNo();
}

//create note
function ctNo() {
  let type = $('#cnp-type').val();
  let content = $('#cnp-content').val();
  let r = /\S/;
  if(r.test(content)) {
    $('#r-cnp-btn').attr("disabled", true);
    $('#cnp-btn').addClass("disabled");
    $.ajax({
      url: './controller.php',
      type: 'post',
      dataType: 'json',
      data: {
        ctNoType: type,
        ctNoCon: content
      },
      success: function(data) {
        if(data.S) {
          $('#cnp-content').val('');
          $('#announcement-content').html('');
          $('#memo-content').html('');
          $.each(data.R.A, function(i, v) {
            var p = $('<p>' + v.cd + '  <b>' + v.con + '</b></p>');
            $('#announcement-content').append(p);
          });
          $.each(data.R.M, function(i, v) {
            var p = $('<p>' + v.cd + '  <b>' + v.con + '</b></p>');
            $('#memo-content').append(p);
          });
          Materialize.toast('新增完成', 2000, 'rounded white-text blue darken-4');
        }
        else {
          Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
        }
        $('#r-cnp-btn').attr("disabled", false);
        $('#cnp-btn').removeClass("disabled");
      },
      error: function(jqXHR) {
        console.log('ctNo_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
      }
    });
  } else {
    Materialize.toast('資料格式錯誤', 2000, 'rounded white-text red darken-4');
  }
}

//get note
function gtNo() {
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      ltNo: 1
    },
    success: function(data) {
      if(data.S) {
        $('#announcement-content').html('');
        $('#memo-content').html('');
        $.each(data.R.A, function(i, v) {
          var p = $('<p>' + v.cd + '  <b>' + v.con + '</b></p>');
          $('#announcement-content').append(p);
        });
        $.each(data.R.M, function(i, v) {
          var p = $('<p>' + v.cd + '  <b>' + v.con + '</b></p>');
          $('#memo-content').append(p);
        });
      }
    },
    error: function(jqXHR) {
      console.log('gtNo_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//list note
function ltNo() {
  let key = $('#snt').val();
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      ltNoKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.enp-elm').show();
        $('#enp-table table tbody').html('');
        $.each(data.R, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td hidden>' + v.no + '</td><td>' + v.mna + '</td><td>' + v.type + '</td><td>' + v.con + '</td><td>' + v.cd + '</td>');
          $('#enp-table table tbody').append(tr);
        });
      }
      else {
        $('.enp-elm').hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('ltNo_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//edit note modal
function edNoMd() {
  let id = $('#enp-table table tbody input:checked').parent().next();
  let cat = id.next().next();
  let content = cat.next();
  if(id.length > 0) {
    $('#enp-modal-table table').show();
    $('#enp-modal-table p').hide();
    $('#enp-modal-table>table>tbody').html('');
    for(let i=0; i<id.length; i++) {
      $('#enp-modal-table>table>tbody').append('<tr><td class="enp-id">'+id[i].textContent+'</td><td>'+cat[i].textContent+'</td><td><input value="'+content[i].textContent+'" type="text" class="enp-content"></td></tr>');
    }
    $('#enp-modal').modal('open');
    $('#enp-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="editNo" class="modal-action modal-close waves-effect waves-green btn-flat">修改</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//edit note
function edNo() {
  let id = $('.enp-id');
  let content = $('.enp-content');
  let key = $('#snt').val();
  let enid = "";
  let encontent = "";
  for(let i=0; i<id.length; i++) {
    enid += ','+id[i].textContent;
    encontent += ','+content[i].val();
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      edNoId: enid.substring(1),
      edNoCon: encontent.substring(1),
      edNoKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.enp-elm').show();
        $('#enp-table table tbody').html('');
        $('#announcement-content').html('');
        $('#memo-content').html('');
        $.each(data.R.L, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td hidden>' + v.no + '</td><td>' + v.mna + '</td><td>' + v.type + '</td><td>' + v.con + '</td><td>' + v.cd + '</td>');
          $('#enp-table table tbody').append(tr);
        });
        $.each(data.R.A, function(i, v) {
          var p = $('<p>' + v.cd + '  <b>' + v.con + '</b></p>');
          $('#announcement-content').append(p);
        });
        $.each(data.R.M, function(i, v) {
          var p = $('<p>' + v.cd + '  <b>' + v.con + '</b></p>');
          $('#memo-content').append(p);
        });
        Materialize.toast('修改完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('.enp-elm').hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('edNo_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}

//delete note modal
function deNoMd() {
  let id = $('#enp-table table tbody input:checked').parent().next();
  let content = id.next().next().next();
  if(id.length > 0) {
    $('#enp-modal-table table').hide();
    $('#enp-modal-table p').show();
    let str = '';
    str += '<p>你確定要刪除下列項目';
    for(let i=0; i<id.length; i++) {
      str += ',<span id="'+id[i].textContent+'" class="enp-id red-text">['+id[i].textContent+']'+content[i].textContent+'</span>';
    }
    str += '嗎?</p>';
    $('.enp-del-msg').html(str);
    $('#enp-modal').modal('open');
    $('#enp-modal>.modal-footer').html('<a class="modal-action modal-close waves-effect waves-green btn-flat">取消</a><a id="delNo" class="modal-action modal-close waves-effect waves-green btn-flat">刪除</a>');
  } else {
    Materialize.toast('請選擇任意項目', 2000, 'rounded white-text red darken-4');
  }
}

//delete note
function deNo() {
  let id = $('.enp-id');
  let key = $('#snt').val();
  let enid = "";
  for(let i=0; i<id.length; i++) {
    enid += ','+id[i].id;
  }
  $.ajax({
    url: './controller.php',
    type: 'post',
    dataType: 'json',
    data: {
      deNoId: enid.substring(1),
      deNoKey: key
    },
    success: function(data) {
      if(data.S) {
        $('.enp-elm').show();
        $('#enp-table table tbody').html('');
        $('#announcement-content').html('');
        $('#memo-content').html('');
        $.each(data.R.L, function(i, v) {
          var tr = $('<tr></tr>');
          tr.append('<td><input class="filled-in" type="checkbox"/><label></label></td><td hidden>' + v.no + '</td><td>' + v.mna + '</td><td>' + v.type + '</td><td>' + v.con + '</td><td>' + v.cd + '</td>');
          $('#enp-table table tbody').append(tr);
        });
        $.each(data.R.A, function(i, v) {
          var p = $('<p>' + v.cd + '  <b>' + v.con + '</b></p>');
          $('#announcement-content').append(p);
        });
        $.each(data.R.M, function(i, v) {
          var p = $('<p>' + v.cd + '  <b>' + v.con + '</b></p>');
          $('#memo-content').append(p);
        });
        Materialize.toast('刪除完成', 2000, 'rounded white-text blue darken-4');
      }
      else {
        $('.enp-elm').hide();
        Materialize.toast(data.R, 2000, 'rounded white-text red darken-4');
      }
    },
    error: function(jqXHR) {
      console.log('deNo_ERR: ' + jqXHR.status + ' -- ' + jqXHR.statusText);
    }
  });
}
