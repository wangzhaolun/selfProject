<?php
  header("content-type:application/json;charset=utf-8");
  //1:获取参数uname upwd
  @$uname = $_REQUEST['uname']or die('{"code":-2,"msg":"用户名是必须的"}');
  @$upwd = $_REQUEST['upwd']or die('{"code":-3,"msg":"密码是必须的"}');
  //2:连接数据库 设置编码
  require("init.php");
  //3:创建sql    发送 sql
  $sql = " SELECT * FROM t_user";
  $sql .= " WHERE uname='$uname'";
  $sql .= " AND upwd = '$upwd'";
  //4:抓取一行记录
  $result = mysqli_query($conn,$sql);
  $row = mysqli_fetch_assoc($result);
  //5:判断输出最终结果 code uid uname ?
  if($row===NULL){
    echo '{"code":-1,"msg":"用户名或密码有误"}';
  }else{
	$uid = $row['uid'];
	$uname = $row['uname'];
    //创建关联数组-->json字符串
	$output = [
	 "code"=>1,
	 "uid"=>$uid,
	 "uname"=>$uname,
	 "msg"=>"登陆成功"
	];
    echo json_encode($output);
  }
?>