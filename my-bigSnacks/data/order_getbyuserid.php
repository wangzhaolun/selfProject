<?php
header('Content-Type:application/json');
$output = [];
@$userid = $_REQUEST['userid'];
if(empty($userid)){
    echo "[]"; //若客户端未提交用户id，则返回一个空数组，
    return;    //并退出当前页面的执行
}
require('init.php');
$sql = "SELECT big_order.oid,big_order.userid,big_order.phone,big_order.addr,
big_order.totalprice,big_order.user_name,big_order.order_time,
big_orderdetails.did,big_orderdetails.dishcount,big_orderdetails.price,
big_dish.name,big_dish.img_sm from big_order,big_orderdetails,big_dish
WHERE big_order.oid = big_orderdetails.oid and big_orderdetails.did = big_dish.did and big_order.userid='$userid'";
$result = mysqli_query($conn, $sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($output);
?>