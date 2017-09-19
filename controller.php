<?php
require_once('model.php');
date_default_timezone_set("Asia/Taipei");

/*權限管理*/
/*登入*/
if(isset($_POST['logId']) && isset($_POST['logPwd'])){
  $id = $_POST['logId'];
  $pwd = $_POST['logPwd'];
  $login = login($id, $pwd);
  if( mysql_num_rows($login) == 1 ){
    $data = mysql_fetch_assoc($login);
    $_SESSION['position'] = $data['position'];
    $_SESSION['id'] = $data['id'];
    echo '{"R":"登入成功", "S": 1}';
  }
  else{
    echo '{"R":"帳號密碼輸入錯誤", "S": 0}';
  }
}

/*驗證登入*/
if(isset($_POST['ifLogin'])){
  if(isset($_SESSION['id'])){
    $id = $_SESSION['id'];
    $pos = $_SESSION['position'];
    echo '{"R":"'.$pos.'", "S": 1}';
  }
  else{
    echo '{"R":"請先登入", "S": 0}';
  }
}

/*登出功能*/
if(isset($_POST['logout'])){
  if(isset($_SESSION['id'])){
    unset($_SESSION['id']);
    unset($_SESSION['position']);
    echo '{"S": 1}';
  }
  else{
    echo '{"R":"系統錯誤", "S": 0}';
  }
}

/*管理員管理*/
/*新增*/
if(isset($_POST['cmgId']) && isset($_POST['cmgPwd']) && isset($_POST['cmgName']) && isset($_POST['cmgPos'])){
  if(isset($_SESSION['position']) && $_SESSION['position'] == '管理員'){
    $id = $_POST['cmgId'];
    $pwd = $_POST['cmgPwd'];
    $name = $_POST['cmgName'];
    $pos = $_POST['cmgPos'];
    if(createManager($id, $pwd, $name, $pos)){
      echo '{"R":"建立成功", "S": 1}';
    } else {
      echo '{"R":"建立失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*查詢*/
if(isset($_POST['ltMgKey'])) {
  if(isset($_SESSION['position']) && $_SESSION['position'] == '管理員'){
    $key = $_POST['ltMgKey'];
    $data = searchManagerByKey($key);
    if(mysql_num_rows($data) >0){
      $arr = [];
      while($rs=mysql_fetch_assoc($data)){
        array_push($arr, array('id' => $rs['id'],
               'name' => $rs['name'],
               'password' => base64_decode($rs['password']),
               'position' => $rs['position']));
      }
      echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
    }else {
      echo '{"R":"查無資料", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*修改*/
if(isset($_POST['edMgId']) && isset($_POST['edMgName']) && isset($_POST['edMgPwd']) && isset($_POST['edMgKey'])) {
  if(isset($_SESSION['position']) && $_SESSION['position'] == '管理員'){
    $id = $_POST['edMgId'];
    $name = $_POST['edMgName'];
    $pwd = $_POST['edMgPwd'];
    $ids = explode(",", $id);
    $names = explode(",", $name);
    $pwds = explode(",", $pwd);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!updateManager($ids[$i], $pwds[$i], $names[$i])) {
        $rs++;
      }
    }
    if($rs == 0){
      $key = $_POST['edMgKey'];
      $data = searchManagerByKey($key);
      if(mysql_num_rows($data) >0){
        $arr = [];
        while($rs=mysql_fetch_assoc($data)){
          array_push($arr, array('id' => $rs['id'],
                 'name' => $rs['name'],
                 'password' => base64_decode($rs['password']),
                 'position' => $rs['position']));
        }
        echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
      }else {
        echo '{"R":"查無資料", "S": 0}';
      }
    } else {
      echo '{"R":"修改失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*刪除*/
if(isset($_POST['deMgId']) && isset($_POST['deMgKey'])) {
  if(isset($_SESSION['position']) && $_SESSION['position'] == '管理員'){
    $id = $_POST['deMgId'];
    $ids = explode(",", $id);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!deleteManager($ids[$i])) {
        $rs++;
      }
    }
    if($rs == 0){
      $key = $_POST['deMgKey'];
      $data = searchManagerByKey($key);
      if(mysql_num_rows($data) >0){
        $arr = [];
        while($rs=mysql_fetch_assoc($data)){
          array_push($arr, array('id' => $rs['id'],
                 'name' => $rs['name'],
                 'password' => base64_decode($rs['password']),
                 'position' => $rs['position']));
        }
        echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
      }else {
        echo '{"R":"查無資料", "S": 0}';
      }
    } else {
      echo '{"R":"刪除失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*使用者管理*/
/*新增*/
if(isset($_POST['curId']) && isset($_POST['curName']) && isset($_POST['curNum']) && isset($_POST['curPos']) && isset($_POST['curDep'])){
  if(isset($_SESSION['id'])){
    $id = $_POST['curId'];
    $name = $_POST['curName'];
    $num = $_POST['curNum'];
    $pos = $_POST['curPos'];
    $dep = $_POST['curDep'];
    if(createUser($id, $name, $dep, $pos, $num)){
      echo '{"R":"建立成功", "S": 1}';
    } else {
      echo '{"R":"建立失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*批次新增*/
if(isset($_POST['baCurId']) && isset($_POST['baCurName']) && isset($_POST['baCurNum']) && isset($_POST['baCurPos']) && isset($_POST['baCurDep'])) {
  if(isset($_SESSION['id'])){
    $id = $_POST['baCurId'];
    $name = $_POST['baCurName'];
    $num = $_POST['baCurNum'];
    $pos = $_POST['baCurPos'];
    $dep = $_POST['baCurDep'];
    $ids = explode(",", $id);
    $names = explode(",", $name);
    $nums = explode(",", $num);
    $poss = explode(",", $pos);
    $deps = explode(",", $dep);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!createUser($ids[$i], $names[$i], $deps[$i], $poss[$i], $nums[$i])) {
        $rs++;
      }
    }
    if($rs == 0){
      echo '{"R":"建立成功", "S": 1}';
    } else {
      echo '{"R":"建立失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*查詢*/
if(isset($_POST['ltUrKey'])) {
  if(isset($_SESSION['id'])){
    $key = $_POST['ltUrKey'];
    $data = searchUserByKey($key);
    if(mysql_num_rows($data) >0){
      $arr = [];
      while($rs=mysql_fetch_assoc($data)){
        array_push($arr, array('id' => $rs['id'],
               'name' => $rs['name'],
               'department' => $rs['department'],
               'phone' => $rs['phone'],
               'status' => $rs['status'],
               'pos' => $_SESSION['position']));
      }
      echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
    }else {
      echo '{"R":"查無資料", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*修改*/
if(isset($_POST['edUrId']) && isset($_POST['edUrName']) && isset($_POST['edUrNum']) && isset($_POST['edUrDep']) && isset($_POST['edUrKey'])) {
  if(isset($_SESSION['id'])){
    $id = $_POST['edUrId'];
    $name = $_POST['edUrName'];
    $num = $_POST['edUrNum'];
    $dep = $_POST['edUrDep'];
    $ids = explode(",", $id);
    $names = explode(",", $name);
    $nums = explode(",", $num);
    $deps = explode(",", $dep);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!updateUser($ids[$i], $names[$i], $nums[$i], $deps[$i])) {
        $rs++;
      }
    }
    if($rs == 0){
      $key = $_POST['edUrKey'];
      $data = searchUserByKey($key);
      if(mysql_num_rows($data) >0){
        $arr = [];
        while($rs=mysql_fetch_assoc($data)){
          array_push($arr, array('id' => $rs['id'],
                 'name' => $rs['name'],
                 'department' => $rs['department'],
                 'phone' => $rs['phone'],
                 'status' => $rs['status'],
                 'pos' => $_SESSION['position']));
        }
        echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
      }else {
        echo '{"R":"查無資料", "S": 0}';
      }
    } else {
      echo '{"R":"修改失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*解除封鎖*/
if(isset($_POST['reUrId']) && isset($_POST['reUrKey'])) {
  if(isset($_SESSION['position']) && $_SESSION['position'] == '管理員') {
    $id = $_POST['reUrId'];
    $key = $_POST['reUrKey'];
    $rs = 0;
    if(!updateUserStatusToFree($id)) {
      $rs++;
    }
    if($rs == 0){
      $data = searchUserByKey($key);
      if(mysql_num_rows($data) >0){
        $arr = [];
        while($rs=mysql_fetch_assoc($data)){
          array_push($arr, array('id' => $rs['id'],
                 'name' => $rs['name'],
                 'department' => $rs['department'],
                 'phone' => $rs['phone'],
                 'status' => $rs['status'],
                 'pos' => $_SESSION['position']));
        }
        echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
      }else {
        echo '{"R":"查無資料", "S": 0}';
      }
    } else {
      echo '{"R":"解除失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*刪除*/
if(isset($_POST['deUrId']) && isset($_POST['deUrKey'])) {
  if(isset($_SESSION['id'])){
    $id = $_POST['deUrId'];
    $ids = explode(",", $id);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!deleteUser($ids[$i])) {
        $rs++;
      }
    }
    if($rs == 0){
      $key = $_POST['deUrKey'];
      $data = searchUserByKey($key);
      if(mysql_num_rows($data) >0){
        $arr = [];
        while($rs=mysql_fetch_assoc($data)){
          array_push($arr, array('id' => $rs['id'],
                 'name' => $rs['name'],
                 'department' => $rs['department'],
                 'phone' => $rs['phone'],
                 'status' => $rs['status'],
                 'pos' => $_SESSION['position']));
        }
        echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
      }else {
        echo '{"R":"查無資料", "S": 0}';
      }
    } else {
      echo '{"R":"刪除失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*物品管理*/
/*新增*/
if(isset($_POST['citId']) && isset($_POST['citName']) && isset($_POST['citCat']) && isset($_POST['citCol1']) && isset($_POST['citCol2']) && isset($_POST['citCol3'])){
  if(isset($_SESSION['id'])){
    $id = $_POST['citId'];
    $name = $_POST['citName'];
    $cat = $_POST['citCat'];
    $col1 = $_POST['citCol1'];
    $col2 = $_POST['citCol2'];
    $col3 = $_POST['citCol3'];
    if(createItem($id, $cat, $name, $col1, $col2, $col3)){
      echo '{"R":"建立成功", "S": 1}';
    } else {
      echo '{"R":"建立失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*查詢*/
if(isset($_POST['ltItKey'])) {
  if(isset($_SESSION['id'])){
    $key = $_POST['ltItKey'];
    $data = searchItemByKey($key);
    if(mysql_num_rows($data) >0){
      $arr = [];
      while($rs=mysql_fetch_assoc($data)){
        array_push($arr, array('id' => $rs['id'],
               'category' => $rs['category'],
               'name' => $rs['name'],
               'colm1' => $rs['colm1'],
               'colm2' => $rs['colm2'],
               'colm3' => $rs['colm3'],
               'status' => $rs['status']));
      }
      echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
    }else {
      echo '{"R":"查無資料", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*修改*/
if(isset($_POST['edItId']) && isset($_POST['edItName']) && isset($_POST['edItCol1']) && isset($_POST['edItCol2']) && isset($_POST['edItCol3']) && isset($_POST['edItKey'])) {
  if(isset($_SESSION['id'])){
    $id = $_POST['edItId'];
    $name = $_POST['edItName'];
    $col1 = $_POST['edItCol1'];
    $col2 = $_POST['edItCol2'];
    $col3 = $_POST['edItCol3'];
    $ids = explode(",", $id);
    $names = explode(",", $name);
    $col1s = explode(",", $col1);
    $col2s = explode(",", $col2);
    $col3s = explode(",", $col3);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!updateItemData($ids[$i], $names[$i], $col1s[$i], $col2s[$i], $col3s[$i])) {
        $rs++;
      }
    }
    if($rs == 0){
      $key = $_POST['edItKey'];
      $data = searchItemByKey($key);
      if(mysql_num_rows($data) >0){
        $arr = [];
        while($rs=mysql_fetch_assoc($data)){
          array_push($arr, array('id' => $rs['id'],
                 'category' => $rs['category'],
                 'name' => $rs['name'],
                 'colm1' => $rs['colm1'],
                 'colm2' => $rs['colm2'],
                 'colm3' => $rs['colm3'],
                 'status' => $rs['status']));
        }
        echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
      }else {
        echo '{"R":"查無資料", "S": 0}';
      }
    } else {
      echo '{"R":"修改失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*保留*/
if(isset($_POST['reItId']) && isset($_POST['reItSts']) && isset($_POST['reItKey'])) {
  if(isset($_SESSION['id'])){
    $id = $_POST['reItId'];
    $sts = $_POST['reItSts'];
    $rs = 0;
    if($sts == '存貨中') {
      if(!reserveItem($id)) {
        $rs++;
      }
    } else if($sts == '保留中') {
      if(!cancelReserveItem($id)) {
        $rs++;
      }
    } else {
      $rs++;
    }
    if($rs == 0){
      $key = $_POST['reItKey'];
      $data = searchItemByKey($key);
      if(mysql_num_rows($data) >0){
        $arr = [];
        while($rs=mysql_fetch_assoc($data)){
          array_push($arr, array('id' => $rs['id'],
                 'category' => $rs['category'],
                 'name' => $rs['name'],
                 'colm1' => $rs['colm1'],
                 'colm2' => $rs['colm2'],
                 'colm3' => $rs['colm3'],
                 'status' => $rs['status']));
        }
        echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
      }else {
        echo '{"R":"查無資料", "S": 0}';
      }
    } else {
      echo '{"R":"保留失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*刪除*/
if(isset($_POST['deItId']) && isset($_POST['deItKey'])) {
  if(isset($_SESSION['id'])){
    $id = $_POST['deItId'];
    $ids = explode(",", $id);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!deleteItem($ids[$i])) {
        $rs++;
      }
    }
    if($rs == 0){
      $key = $_POST['deItKey'];
      $data = searchItemByKey($key);
      if(mysql_num_rows($data) >0){
        $arr = [];
        while($rs=mysql_fetch_assoc($data)){
          array_push($arr, array('id' => $rs['id'],
                 'category' => $rs['category'],
                 'name' => $rs['name'],
                 'colm1' => $rs['colm1'],
                 'colm2' => $rs['colm2'],
                 'colm3' => $rs['colm3'],
                 'status' => $rs['status']));
        }
        echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
      }else {
        echo '{"R":"查無資料", "S": 0}';
      }
    } else {
      echo '{"R":"刪除失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*借閱*/
/*查詢使用者借閱狀況*/
if(isset($_POST['getUrId'])) {
  if(isset($_SESSION['id'])){
    $id = $_POST['getUrId'];
    $data = searchUserById($id);
    if(mysql_num_rows($data) >0){
      $rs=mysql_fetch_assoc($data);
      echo '{"R":{"uName": "'.$rs["name"].'","pos": "'.$rs["position"].'"}, "S": 1}';
    }else {
      echo '{"R":"使用者不存在", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*查詢物品借閱狀況*/
if(isset($_POST['getItId'])) {
  if(isset($_SESSION['id'])){
    $id = $_POST['getItId'];
    $data = searchItemById($id);
    if(mysql_num_rows($data) >0){
      $rs=mysql_fetch_assoc($data);
      echo '{"R":{"cat": "'.$rs["category"].'", "iName": "'.$rs["name"].'", "iSts": "'.$rs["status"].'"}, "S": 1}';
    }else {
      echo '{"R":"物品不存在", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*借閱*/
if (isset($_POST['crpUid']) && isset($_POST['crpIid']) && isset($_POST['crpCard']) && isset($_POST['crpDay'])) {
  if(isset($_SESSION['id'])){
    $uid = $_POST['crpUid'];
    $iid = $_POST['crpIid'];
    $card = $_POST['crpCard'];
    $day = $_POST['crpDay'];
    $uDt = searchUserById($uid);
    $iDt = searchItemById($iid);
    $uRs=mysql_fetch_assoc($uDt);
    $iRs=mysql_fetch_assoc($iDt);
    $now = date('Y-m-d');
    $pos = $uRs['position'];
    $bq = $uRs['book_quantity'];
    $mq = $uRs['magazine_quantity'];
    $type = 1;
    if($iRs['status'] == '存貨中' && $uRs['status'] == '封鎖中' && $uRs['block_date'] <= $now) {
      if (updateUserStatusToFree($uid)) {
        $uDt = searchUserById($uid);
        $iDt = searchItemById($iid);
        $uRs=mysql_fetch_assoc($uDt);
        $iRs=mysql_fetch_assoc($iDt);
      }
    }
    //check input data valid
    if(mysql_num_rows($uDt)>0 && mysql_num_rows($iDt)>0){
      //check day valid accroding to position
      if($iRs['status'] == '存貨中' && $uRs['status'] == '可使用') {
        $cat = mb_substr($iRs['category'], 0, 2, 'UTF-8');
        if ($cat == '書籍') {
          if( ($pos == '學士班' && $bq < 3 && $day < 8) || ($pos == '碩士班' && $bq < 5 && $day < 15) || ($pos == '教職員' && $bq < 7 && $day < 31) ) {
            if(!(createBorrowRecord($uid, $iid, $card, $day) && addUserBookBorrowQuantity($uid, $bq) && updateItemStatusToBorrow($iid))) {
              $type = 2;
            }
          } else {
            $type = 3;
          }
        } else if ($cat == '雜誌') {
          if( ($pos == '學士班' && $mq < 3 && $day < 8) || ($pos == '碩士班' && $mq < 5 && $day < 8) || ($pos == '教職員' && $mq < 5 && $day < 31) ) {
            if(!(createBorrowRecord($uid, $iid, $card, $day) && addUserMagazineBorrowQuantity($uid, $mq) && updateItemStatusToBorrow($iid))) {
              $type = 2;
            }
          } else {
            $type = 3;
          }
        } else {
          if(!(createBorrowRecord($uid, $iid, $card, $day) && updateItemStatusToBorrow($iid))) {
            $type = 2;
          }
        }
        if($type == 1) {
          $data = searchBorrowingRecord();
          $arr = [];
          while($rs=mysql_fetch_assoc($data)){
            array_push($arr, array('no' => $rs['no'],
                   'id' => $rs['id'],
                   'cat' => $rs['category'],
                   'pos' => $rs['position'],
                   'ina' => $rs['ina'],
                   'una' => $rs['una'],
                   'card' => $rs['card'],
                   'df' => $rs['df']));
          }
          echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
        } else if ($type == 2) {
          echo '{"R":"借閱失敗", "S": 0}';
        } else {
          echo '{"R":"資格不符，請詳閱借閱規則", "S": 0}';
        }
      } else {
        echo '{"R":"物品不得借閱/使用者遭封鎖", "S": 0}';
      }
    } else {
      echo '{"R":"物品/使用者不存在", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*借閱中項目*/
if(isset($_POST['gtBg'])){
  $data = searchBorrowingRecord();
  $arr = [];
  while($rs=mysql_fetch_assoc($data)){
    array_push($arr, array('no' => $rs['no'],
           'id' => $rs['id'],
           'cat' => $rs['category'],
           'pos' => $rs['position'],
           'ina' => $rs['ina'],
           'una' => $rs['una'],
           'card' => $rs['card'],
           'df' => $rs['df']));
  }
  echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
}

/*歸還*/
if(isset($_POST['rtNo'])){
  if(isset($_SESSION['id'])){
    $no = $_POST['rtNo'];
    $nos = explode(",", $no);
    $rs = 0;
    //get user id and item id
    for($i=0; $i<count($nos); $i++) {
      $rd = searchRecordByNo($nos[$i]);
      $rrs = mysql_fetch_assoc($rd);
      if(mysql_num_rows($rd) >0 && $rrs['return_status'] == '尚未歸還') {
        $uid = $rrs['user_id'];
        $iid = $rrs['item_id'];
        $urd = searchUserById($uid);
        $urs = mysql_fetch_assoc($urd);
        $itd = searchItemById($iid);
        $irs = mysql_fetch_assoc($itd);
        $cat = mb_substr($irs['category'], 0, 2, 'UTF-8');
        $now = date('Y-m-d');
        $time = mktime(date('H'),date('i'),date('s'));
        $lawtime = mktime(10,0,0);
        $lawtime2 = mktime(9,0,0);
        if ($cat == '書籍') {
          if(($now < $rrs['should_return_date']) || ($now == $rrs['should_return_date'] && $time <= $lawtime) || ($now == $urs['error_date'])) {
            if(!(returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid) && minusUserBookBorrowQuantity($uid, $urs['book_quantity']))) {
              $rs++;
            }
          } else if($urs['error'] > 1){
            if(!(updateUserStatusToBlock($uid) && addUserErrorQuantity($uid, $urs['error']) && updateUserErrorDate($uid) && returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid) && minusUserBookBorrowQuantity($uid, $urs['book_quantity']))) {
              $rs++;
            }
          } else {
            if(!(addUserErrorQuantity($uid, $urs['error']) && updateUserErrorDate($uid) && returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid) && minusUserBookBorrowQuantity($uid, $urs['book_quantity']))) {
              $rs++;
            }
          }
        } else if ($cat == '雜誌') {
          if(($now < $rrs['should_return_date']) || ($now == $rrs['should_return_date'] && $time <= $lawtime) || ($now == $urs['error_date'])) {
            if(!(returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid) && minusUserMagazineBorrowQuantity($uid, $urs['magazine_quantity']))) {
              $rs++;
            }
          } else if($urs['error'] > 1){
            if(!(updateUserStatusToBlock($uid) && addUserErrorQuantity($uid, $urs['error']) && updateUserErrorDate($uid) && returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid) && minusUserMagazineBorrowQuantity($uid, $urs['magazine_quantity']))) {
              $rs++;
            }
          } else {
            if(!(addUserErrorQuantity($uid, $urs['error']) && updateUserErrorDate($uid) && returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid) && minusUserMagazineBorrowQuantity($uid, $urs['magazine_quantity']))) {
              $rs++;
            }
          }
        } else if ($cat == '鑰匙') {
          if(($now < $rrs['should_return_date']) || ($now == $rrs['should_return_date'] && $time <= $lawtime2) || ($now == $urs['error_date'])) {
            if(!(returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid))) {
              $rs++;
            }
          } else if($urs['error'] > 1){
            if(!(updateUserStatusToBlock($uid) && addUserErrorQuantity($uid, $urs['error']) && updateUserErrorDate($uid) && returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid))) {
              $rs++;
            }
          } else {
            if(!(addUserErrorQuantity($uid, $urs['error']) && updateUserErrorDate($uid) && returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid))) {
              $rs++;
            }
          }
        } else {
          if(($now < $rrs['should_return_date']) || ($now == $rrs['should_return_date'] && $time <= $lawtime) || ($now == $urs['error_date'])) {
            if(!(returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid))) {
              $rs++;
            }
          } else if($urs['error'] > 1){
            if(!(updateUserStatusToBlock($uid) && addUserErrorQuantity($uid, $urs['error']) && updateUserErrorDate($uid) && returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid))) {
              $rs++;
            }
          } else {
            if(!(addUserErrorQuantity($uid, $urs['error']) && updateUserErrorDate($uid) && returnBorrowRecord($nos[$i]) && updateItemStatusToReturn($iid))) {
              $rs++;
            }
          }
        }
      } else {
        $rs++;
      }
    }
    if($rs > 0) {
      echo '{"R":"歸還失敗", "S": 0}';
    } else {
      $data = searchBorrowingRecord();
      $arr = [];
      while($rs=mysql_fetch_assoc($data)){
        array_push($arr, array('no' => $rs['no'],
               'id' => $rs['id'],
               'cat' => $rs['category'],
               'pos' => $rs['position'],
               'ina' => $rs['ina'],
               'una' => $rs['una'],
               'card' => $rs['card'],
               'df' => $rs['df']));
      }
      echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*續借*/
if(isset($_POST['etNo']) && isset($_POST['etDay']) && isset($_POST['etCat']) && isset($_POST['etPos'])){
  if(isset($_SESSION['id'])){
    $no = $_POST['etNo'];
    $nos = explode(",", $no);
    $day = $_POST['etDay'];
    $days = explode(",", $day);
    $cat = $_POST['etCat'];
    $cats = explode(",", $cat);
    $pos = $_POST['etPos'];
    $poss = explode(",", $pos);
    $type = 1;
    for($i=0; $i<count($nos); $i++) {
      $cag = mb_substr($cats[$i], 0, 2, 'UTF-8');
      if ($cag == '書籍') {
        if( ($poss[$i] == '學士班' && $days[$i] < 8) || ($poss[$i] == '碩士班' && $days[$i] < 15) || ($poss[$i] == '教職員' && $days[$i] < 31) ) {
          if(!(extendRecord($nos[$i], $days[$i]))) {
            $type = 2;
          }
        } else {
          $type = 3;
        }
      } else if ($cag == '雜誌') {
        if( ($poss[$i] == '學士班' && $days[$i] < 8) || ($poss[$i] == '碩士班' && $days[$i] < 8) || ($poss[$i] == '教職員' && $days[$i] < 31) ) {
          if(!(extendRecord($nos[$i], $days[$i]))) {
            $type = 2;
          }
        } else {
          $type = 3;
        }
      } else {
        if(!(extendRecord($nos[$i], $days[$i]))) {
          $type = 2;
        }
      }
    }
    if($type == 1) {
      $data = searchBorrowingRecord();
      $arr = [];
      while($rs=mysql_fetch_assoc($data)){
        array_push($arr, array('no' => $rs['no'],
               'id' => $rs['id'],
               'cat' => $rs['category'],
               'pos' => $rs['position'],
               'ina' => $rs['ina'],
               'una' => $rs['una'],
               'card' => $rs['card'],
               'df' => $rs['df']));
      }
      echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
    } else if($type == 2) {
      echo '{"R":"續借失敗", "S": 0}';
    } else {
      echo '{"R":"資格不符，請詳閱借閱規則", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*查詢借閱紀錄*/
if(isset($_POST['ltRdKey'])) {
  if(isset($_SESSION['id'])){
    $key = $_POST['ltRdKey'];
    $data = searchRecordByKey($key);
    if(mysql_num_rows($data) >0){
      $arr = [];
      while($rs=mysql_fetch_assoc($data)){
        array_push($arr, array('no' => $rs['no'],
               'mna' => $rs['mna'],
               'una' => $rs['una'],
               'ina' => $rs['ina'],
               'rts' => $rs['return_status'],
               'bd' => $rs['borrow_date'],
               'rd' => $rs['return_date'],
               'sts' => $rs['status']));
      }
      echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
    }else {
      echo '{"R":"查無資料", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*復原借閱紀錄*/
if(isset($_POST['tbNo'])) {
  if(isset($_SESSION['id'])){
    $no = $_POST['tbNo'];
    $rd = searchRecordByNo($no);
    $rrs = mysql_fetch_assoc($rd);
    $uid = $rrs['user_id'];
    $iid = $rrs['item_id'];
    $uDt = searchUserById($uid);
    $iDt = searchItemById($iid);
    $uRs=mysql_fetch_assoc($uDt);
    $iRs=mysql_fetch_assoc($iDt);
    if(mysql_num_rows($rd) >0 && $rrs['return_status'] == '已歸還' && $iRs['status'] == '存貨中') {
      $bq = $uRs['book_quantity'];
      $mq = $uRs['magazine_quantity'];
      $cat = mb_substr($iRs['category'], 0, 2, 'UTF-8');
      if ($cat == '書籍') {
        if(turnBackRecord($no) && addUserBookBorrowQuantity($uid, $bq) && updateItemStatusToBorrow($iid)) {
          echo '{"R":"復原成功", "S": 1}';
        } else {
          echo '{"R":"復原失敗", "S": 0}';
        }
      } else if ($cat == '雜誌') {
        if(turnBackRecord($no) && addUserMagazineBorrowQuantity($uid, $mq) && updateItemStatusToBorrow($iid)) {
          echo '{"R":"復原成功", "S": 1}';
        } else {
          echo '{"R":"復原失敗", "S": 0}';
        }
      } else {
        if(turnBackRecord($no) && updateItemStatusToBorrow($iid)) {
          echo '{"R":"復原成功", "S": 1}';
        } else {
          echo '{"R":"復原失敗", "S": 0}';
        }
      }
    } else {
      echo '{"R":"紀錄不得復原", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*公告事項與工讀生記事*/
/*查詢*/
if(isset($_POST['ltNo'])){
  $dt1 = searchNoteByType('記事');
  $dt2 = searchNoteByType('公告');
  $ar1 = [];
  $ar2 = [];
  while($rs1=mysql_fetch_assoc($dt1)){
    array_push($ar1, array('con' => $rs1['content'],
           'cd' => $rs1['create_date']));
  }
  while($rs2=mysql_fetch_assoc($dt2)){
    array_push($ar2, array('con' => $rs2['content'],
           'cd' => $rs2['create_date']));
  }
  $obj = (object) ['M' => $ar1, 'A' => $ar2];
  echo json_encode(array('S' => 1, 'R' => $obj), JSON_UNESCAPED_UNICODE);
}

/*關鍵字查詢*/
if(isset($_POST['ltNoKey'])){
  $key = $_POST['ltNoKey'];
  $data = searchNoteByKey($key);
  if(mysql_num_rows($data) >0){
    $arr = [];
    while($rs=mysql_fetch_assoc($data)){
      array_push($arr, array('no' => $rs['no'],
             'mna' => $rs['name'],
             'type' => $rs['type'],
             'con' => $rs['content'],
             'cd' => $rs['create_date']));
    }
    echo json_encode(array('S' => 1, 'R' => $arr), JSON_UNESCAPED_UNICODE);
  }else {
    echo '{"R":"查無資料", "S": 0}';
  }
}

/*新增*/
if(isset($_POST['ctNoType']) && isset($_POST['ctNoCon'])){
  if(isset($_SESSION['id'])){
    $type = $_POST['ctNoType'];
    $content = mysql_real_escape_string($_POST['ctNoCon']);
    if(createNote($type, $content)){
      $dt1 = searchNoteByType('記事');
      $dt2 = searchNoteByType('公告');
      $ar1 = [];
      $ar2 = [];
      while($rs1=mysql_fetch_assoc($dt1)){
        array_push($ar1, array('con' => $rs1['content'],
               'cd' => $rs1['create_date']));
      }
      while($rs2=mysql_fetch_assoc($dt2)){
        array_push($ar2, array('con' => $rs2['content'],
               'cd' => $rs2['create_date']));
      }
      $obj = (object) ['M' => $ar1, 'A' => $ar2];
      echo json_encode(array('S' => 1, 'R' => $obj), JSON_UNESCAPED_UNICODE);
    } else {
      echo '{"R":"建立失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*修改*/
if(isset($_POST['edNoId']) && isset($_POST['edNoCon']) && isset($_POST['edNoKey'])){
  if(isset($_SESSION['id'])){
    $id = $_POST['edNoId'];
    $content = $_POST['edNoCon'];
    $ids = explode(",", $id);
    $contents = explode(",", $content);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!editNote($ids[$i], nl2br($contents[$i]))) {
        $rs++;
      }
    }
    if($rs == 0){
      $key = $_POST['edNoKey'];
      $dt1 = searchNoteByType('記事');
      $dt2 = searchNoteByType('公告');
      $data = searchNoteByKey($key);
      $arr = [];
      $ar1 = [];
      $ar2 = [];
      while($rs=mysql_fetch_assoc($data)){
        array_push($arr, array('no' => $rs['no'],
               'mna' => $rs['name'],
               'type' => $rs['type'],
               'con' => $rs['content'],
               'cd' => $rs['create_date']));
      }
      while($rs1=mysql_fetch_assoc($dt1)){
        array_push($ar1, array('con' => $rs1['content'],
               'cd' => $rs1['create_date']));
      }
      while($rs2=mysql_fetch_assoc($dt2)){
        array_push($ar2, array('con' => $rs2['content'],
               'cd' => $rs2['create_date']));
      }
      $obj = (object) ['M' => $ar1, 'A' => $ar2, 'L' => $arr];
      echo json_encode(array('S' => 1, 'R' => $obj), JSON_UNESCAPED_UNICODE);
    } else {
      echo '{"R":"編輯失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}

/*刪除*/
if(isset($_POST['deNoId']) && isset($_POST['deNoKey'])){
  if(isset($_SESSION['position'])){
    $id = $_POST['deNoId'];
    $key = $_POST['deNoKey'];
    $ids = explode(",", $id);
    $rs = 0;
    for($i=0; $i<count($ids); $i++) {
      if(!deleteNote($ids[$i])) {
        $rs++;
      }
    }
    if($rs == 0){
      $dt1 = searchNoteByType('記事');
      $dt2 = searchNoteByType('公告');
      $data = searchNoteByKey($key);
      $arr = [];
      $ar1 = [];
      $ar2 = [];
      while($rs=mysql_fetch_assoc($data)){
        array_push($arr, array('no' => $rs['no'],
               'mna' => $rs['name'],
               'type' => $rs['type'],
               'con' => $rs['content'],
               'cd' => $rs['create_date']));
      }
      while($rs1=mysql_fetch_assoc($dt1)){
        array_push($ar1, array('con' => $rs1['content'],
               'cd' => $rs1['create_date']));
      }
      while($rs2=mysql_fetch_assoc($dt2)){
        array_push($ar2, array('con' => $rs2['content'],
               'cd' => $rs2['create_date']));
      }
      $obj = (object) ['M' => $ar1, 'A' => $ar2, 'L' => $arr];
      echo json_encode(array('S' => 1, 'R' => $obj), JSON_UNESCAPED_UNICODE);
    } else {
      echo '{"R":"刪除失敗", "S": 0}';
    }
  } else {
    echo '{"R":"權限不足", "S": 0}';
  }
}
?>