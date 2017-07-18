<?php
header('Content-Type:application/json');
@$uid = $_REQUEST['uid'] or die('uid required');
require('init.php');
$output['uid'] = $uid;
$sql = "SELECT big_cart.ctid,big_cart.did,big_cart.dishCount,big_dish.name,big_dish.img_sm,big_dish.price FROM big_dish,big_cart WHERE big_cart.did=big_dish.did AND big_cart.userid='$uid'";
$result = mysqli_query($conn,$sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($output);
?>