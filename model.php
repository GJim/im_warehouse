<?php

/*呼叫資料庫*/
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'im_warehouse';
$conn = mysqli_connect($host, $user, $pass) or die('Error with MySQL connection');
mysqli_query($GLOBALS['conn'], "SET NAMES utf8");
mysqli_select_db($conn, $db);
session_start();

/*設定台灣時間*/
date_default_timezone_set("Asia/Taipei");

/*登入*/
function login($id, $pwd){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $pwd = mysqli_real_escape_string($GLOBALS['conn'], $pwd);
  $pwd = base64_encode($pwd);
  $sql = "select * from manager_users where id = '$id' and password = '$pwd'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*借閱*/
/*新增借閱資料*/
function createBorrowRecord($uid, $iid, $card, $day){
  $mid = $_SESSION['id'];
  $uid = mysqli_real_escape_string($GLOBALS['conn'], $uid);
  $iid = mysqli_real_escape_string($GLOBALS['conn'], $iid);
  $card = mysqli_real_escape_string($GLOBALS['conn'], $card);
  $day = mysqli_real_escape_string($GLOBALS['conn'], $day);
  $now = date('Y-m-d');
  $sql ="insert into record values(DEFAULT,'$mid','$uid','$iid','$card','尚未歸還','$now',date_add('$now', interval $day day),null)";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*增加使用者書籍借閱數量*/
function addUserBookBorrowQuantity($uid, $quantity){
  $uid = mysqli_real_escape_string($GLOBALS['conn'], $uid);
  $quantity = mysqli_real_escape_string($GLOBALS['conn'], $quantity);
  $quantity = $quantity +1;
  $sql ="update users set book_quantity = $quantity where id ='$uid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*增加使用者雜誌借閱數量*/
function addUserMagazineBorrowQuantity($uid, $quantity){
  $uid = mysqli_real_escape_string($GLOBALS['conn'], $uid);
  $quantity = mysqli_real_escape_string($GLOBALS['conn'], $quantity);
  $quantity = $quantity +1;
  $sql ="update users set magazine_quantity = $quantity where id ='$uid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*物品存貨借出*/
function updateItemStatusToBorrow($iid){
  $iid = mysqli_real_escape_string($GLOBALS['conn'], $iid);
  $sql ="update items set status = '借閱中' where id ='$iid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*更變借閱日期*/
function updateBorrowDay($no, $day){
  $no = mysqli_real_escape_string($GLOBALS['conn'], $no);
  $day = mysqli_real_escape_string($GLOBALS['conn'], $day);
  $now = date('Y-m-d');
  $sql ="update record set should_return_date = date_add('$now', interval $day day) where no ='$no'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*歸還*/
/*更變借閱紀錄*/
function returnBorrowRecord($no){
  $mid = $_SESSION["id"];
  $no = mysqli_real_escape_string($GLOBALS['conn'], $no);
  $now = date('Y-m-d');
  $sql = "update record set manager_id = '$mid', return_date = '$now', return_status = '已歸還' where no = '$no'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*物品歸還*/
function updateItemStatusToReturn($iid){
  $iid = mysqli_real_escape_string($GLOBALS['conn'], $iid);
  $sql = "update items set status = '存貨中' where id = '$iid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*更變使用者書籍借閱狀況*/
function minusUserBookBorrowQuantity($uid, $quantity){
  $uid = mysqli_real_escape_string($GLOBALS['conn'], $uid);
  $quantity = mysqli_real_escape_string($GLOBALS['conn'], $quantity);
  $quantity = $quantity -1;
  $sql ="update users set book_quantity = $quantity where id ='$uid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*更變使用者雜誌借閱狀況*/
function minusUserMagazineBorrowQuantity($uid, $quantity){
  $uid = mysqli_real_escape_string($GLOBALS['conn'], $uid);
  $quantity = mysqli_real_escape_string($GLOBALS['conn'], $quantity);
  $quantity = $quantity -1;
  $sql ="update users set magazine_quantity = $quantity where id ='$uid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*增加使用者違規數量*/
function addUserErrorQuantity($uid, $error){
  $uid = mysqli_real_escape_string($GLOBALS['conn'], $uid);
  $error = mysqli_real_escape_string($GLOBALS['conn'], $error);
  $error = $error +1;
  $sql = "update users set error = $error where id='$uid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*更變使用者違規日期*/
function updateUserErrorDate($uid){
  $uid = mysqli_real_escape_string($GLOBALS['conn'], $uid);
  $now = date('Y-m-d');
  $sql = "update users set error_date = '$now' where id='$uid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*復原*/
function turnBackRecord($no){
  $mid = $_SESSION["id"];
  $no = mysqli_real_escape_string($GLOBALS['conn'], $no);
  $now = date('Y-m-d');
  $sql = "update record set manager_id = '$mid', return_date = null, return_status = '尚未歸還' where no = '$no'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*續借*/
function extendRecord($no, $day){
  $mid = $_SESSION["id"];
  $no = mysqli_real_escape_string($GLOBALS['conn'], $no);
  $day = mysqli_real_escape_string($GLOBALS['conn'], $day);
  $now = date('Y-m-d');
  $sql = "update record set manager_id = '$mid', should_return_date = date_add('$now', interval $day day) where no = '$no'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*管理員管理*/
/*查詢特定管理員*/
function searchManagerById($id){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $sql = "select * from manager_users where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*使用關鍵字查詢*/
function searchManagerByKey($key){
  $key = mysqli_real_escape_string($GLOBALS['conn'], $key);
  $sql = "select * from manager_users where id like '%$key%' or name like '%$key%' or position like '%$key%'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*新增管理員*/
function createManager($id, $pwd, $name, $pos){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $pwd = mysqli_real_escape_string($GLOBALS['conn'], $pwd);
  $pwd = base64_encode($pwd);
  $name = mysqli_real_escape_string($GLOBALS['conn'], $name);
  $pos = mysqli_real_escape_string($GLOBALS['conn'], $pos);
  $sql = "insert into manager_users values('$id','$pwd','$name','$pos')";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*修改管理員*/
function updateManager($id, $pwd, $name){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $pwd = mysqli_real_escape_string($GLOBALS['conn'], $pwd);
  $name = mysqli_real_escape_string($GLOBALS['conn'], $name);
  $pwd = base64_encode($pwd);
  $sql = "update manager_users set password = '$pwd', name = '$name' where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*刪除管理員*/
function deleteManager($id){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $sql1 = "delete from record where manager_id = '$id'";
  $sql2 = "delete from manager_users where id = '$id'";
  $sql3 = "delete from notes where manager_id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql1) && mysqli_query($GLOBALS['conn'], $sql2) && mysqli_query($GLOBALS['conn'], $sql3);
}

/*使用者管理*/
/*查詢特定使用者*/
function searchUserById($id){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $sql = "select * from users where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*使用關鍵字查詢*/
function searchUserByKey($key){
  $key = mysqli_real_escape_string($GLOBALS['conn'], $key);
  $sql = "select * from users where id like '%$key%' or name like '%$key%' or phone like '%$key%' or status like '%$key%'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*新增使用者*/
function createUser($id, $name, $department, $position, $phone){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $name = mysqli_real_escape_string($GLOBALS['conn'], $name);
  $department = mysqli_real_escape_string($GLOBALS['conn'], $department);
  $position = mysqli_real_escape_string($GLOBALS['conn'], $position);
  $phone = mysqli_real_escape_string($GLOBALS['conn'], $phone);
  $sql = "insert into users values('$id', '$name', '$department', '$position', '$phone', DEFAULT, DEFAULT, DEFAULT, null, null, '可使用')";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*修改使用者*/
function updateUser($id, $name, $phone, $department){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $name = mysqli_real_escape_string($GLOBALS['conn'], $name);
  $phone = mysqli_real_escape_string($GLOBALS['conn'], $phone);
  $department = mysqli_real_escape_string($GLOBALS['conn'], $department);
  $sql = "update users set name = '$name', phone = '$phone', department = '$department' where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*刪除使用者*/
function deleteUser($id){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $sql1 = "delete from record where user_id = '$id'";
  $sql2 = "delete from users where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql1) && mysqli_query($GLOBALS['conn'], $sql2);
}

/*封鎖*/
//目前政策為"取消封鎖功能"
function updateUserStatusToBlock($id){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $now = date('Y-m-d');
  $sql = "update users set status = '封鎖中', error_date = '$now', block_date = DATE_ADD('$now', interval 30 Day) where id = '$id'";
  //return mysqli_query($GLOBALS['conn'], $sql);
  return true;
}

/*解除*/
function updateUserStatusToFree($id){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $sql = "update users set status = '可使用', block_date = null, error = 0 where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*物品管理*/
/*查詢特定物品*/
function searchItemById($id){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $sql = "select * from items where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*使用關鍵字查詢*/
function searchItemByKey($key){
  $key = mysqli_real_escape_string($GLOBALS['conn'], $key);
  $sql = "select * from items where id like '%$key%' or category like '%$key%' or name like '%$key%' or colm1 like '%$key%' or colm2 like '%$key%' or colm3 like '%$key%'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*新增物品*/
function createItem($id, $category, $name, $colm1, $colm2, $colm3){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $category = mysqli_real_escape_string($GLOBALS['conn'], $category);
  $name = mysqli_real_escape_string($GLOBALS['conn'], $name);
  $colm1 = mysqli_real_escape_string($GLOBALS['conn'], $colm1);
  $colm2 = mysqli_real_escape_string($GLOBALS['conn'], $colm2);
  $colm3 = mysqli_real_escape_string($GLOBALS['conn'], $colm3);
  $sql = "insert into items values('$id', '$category', '$name', '$colm1', '$colm2', '$colm3', '存貨中')";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*修改物品*/
function updateItemData($id, $name, $colm1, $colm2, $colm3){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $name = mysqli_real_escape_string($GLOBALS['conn'], $name);
  $colm1 = mysqli_real_escape_string($GLOBALS['conn'], $colm1);
  $colm2 = mysqli_real_escape_string($GLOBALS['conn'], $colm2);
  $colm3 = mysqli_real_escape_string($GLOBALS['conn'], $colm3);
  $sql = "update items set name = '$name', colm1 = '$colm1', colm2 = '$colm2', colm3 = '$colm3' where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*刪除物品*/
function deleteItem($id){
  $id = mysqli_real_escape_string($GLOBALS['conn'], $id);
  $sql1 = "delete from record where item_id = '$id'";
  $sql2 = "delete from items where id = '$id'";
  return mysqli_query($GLOBALS['conn'], $sql1) && mysqli_query($GLOBALS['conn'], $sql2);
}

/*保留物品*/
function reserveItem($iid){
  $iid = mysqli_real_escape_string($GLOBALS['conn'], $iid);
  $sql = "update items set status = '保留中' where id = '$iid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*取消保留物品*/
function cancelReserveItem($iid){
  $iid = mysqli_real_escape_string($GLOBALS['conn'], $iid);
  $sql = "update items set status = '存貨中' where id = '$iid'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*查詢借閱紀錄*/
/*使用編號查詢*/
function searchRecordByNo($no){
  $no = mysqli_real_escape_string($GLOBALS['conn'], $no);
  $sql = "select * from record where no = '$no'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*使用關鍵字查詢*/
function searchRecordByKey($key){
  $key = mysqli_real_escape_string($GLOBALS['conn'], $key);
  $sql = "select r.no, m.name as mna, u.name as una, i.name as ina, r.return_status, r.borrow_date, r.return_date, i.status
  from record as r left join items as i on r.item_id = i.id left join users as u on r.user_id = u.id
  left join manager_users as m on r.manager_id = m.id where m.name = '$key' or u.name = '$key'
  or i.name = '$key' or borrow_date like '%$key%' or return_date like '%$key%' or return_status like '%$key%' order by no desc";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*查詢借閱中物品紀錄*/
function searchBorrowingRecord(){
  $now = date('Y-m-d');
  $sql = "select r.no, i.id, i.category, i.name as ina, u.name as una, r.card, r.borrow_date, datediff(r.should_return_date, '$now') as df, u.position
  from record as r left join items as i on r.item_id = i.id left join users as u on r.user_id = u.id
  where r.return_status ='尚未歸還' order by no desc";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*備忘錄管理*/
/*查詢特定備忘錄*/
function searchNoteByNo($no){
  $no = mysqli_real_escape_string($GLOBALS['conn'], $no);
  $sql = "select * from notes where no = '$no'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*使用關鍵字查詢*/
function searchNoteByKey($key){
  $key = mysqli_real_escape_string($GLOBALS['conn'], $key);
  $sql = "select n.*, m.name from notes as n left join manager_users as m on n.manager_id = m.id
  where (content like '%$key%' or create_date like '%$key%') and status = 'current'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*使用類別查詢*/
function searchNoteByType($type){
  $type = mysqli_real_escape_string($GLOBALS['conn'], $type);
  $sql = "select * from notes where type = '$type' and status = 'current' order by create_date desc";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*新增備忘錄*/
function createNote($type, $content){
  $id = $_SESSION['id'];
  $now = date('Y-m-d');
  $type = mysqli_real_escape_string($GLOBALS['conn'], $type);
  $content = mysqli_real_escape_string($GLOBALS['conn'], $content);
  $sql = "insert into notes values(default, '$id', '$type', '$content', '$now', 'current')";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*編輯備忘錄*/
function editNote($no, $content){
  $id = $_SESSION['id'];
  $now = date('Y-m-d');
  $no = mysqli_real_escape_string($GLOBALS['conn'], $no);
  $content = mysqli_real_escape_string($GLOBALS['conn'], $content);
  $sql = "update notes set content = '$content', create_date = '$now' where no = '$no'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

/*刪除備忘錄*/
function deleteNote($no){
  $id = $_SESSION['id'];
  $now = date('Y-m-d');
  $no = mysqli_real_escape_string($GLOBALS['conn'], $no);
  $sql = "update notes set status = 'delete', create_date = '$now' where no = '$no'";
  return mysqli_query($GLOBALS['conn'], $sql);
}

?>