<?php
header("content-type:application/json;charset=utf-8");
@$uname=$_REQUEST['uname'] or die('uname是必须的');
@$upwd=$_REQUEST['upwd'] or die('upwd是必须的');
require("init.php");
$sql="INSERT INTO t_user VALUES(NULL,'$uname','$upwd')";
$result=mysqli_query($conn,$sql);
$addResult=[];
if($result){
	$addResult['code']=mysqli_insert_id($conn);
	$addResult['msg']='注册成功';
}else{
	$addResult['msg']='注册失败';
}
echo json_encode($addResult);
?>