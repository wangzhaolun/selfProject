<?php
header('Content-Type:application/json');
@$uid = $_REQUEST['uid'] or die('uid required');
@$did = $_REQUEST['did'] or die('did required');
@$count = $_REQUEST['count'] or die('did required');
require('init.php');
//判断购物车表中是否已经存在该商品记录
$sql = "SELECT ctid FROM big_cart WHERE userid=$uid AND did=$did";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
  if($count == -1) //之前曾经购买过该商品，则更新购买数量加1
  {
    $sql = "update big_cart set dishCount=dishCount+1 where userid=$uid AND did=$did";
  }
  else //之前曾经购买过该商品，则更新购买数量为参数中的$count
  {
    $sql = "update big_cart set dishCount='$count' where userid=$uid AND did=$did";
  }
  mysqli_query($conn,$sql);
  $output['code'] = 2;
  $output['msg'] = 'update success';
}else {     //之前从未购买过该商品，则添加购买记录，购买数量为1
  $sql = "INSERT INTO big_cart VALUES(NULL,$uid, $did,1)";
  mysqli_query($conn,$sql);
  $output['code'] = 1;
  $output['msg'] = 'add success';
}
echo json_encode($output);
?>