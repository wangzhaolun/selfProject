<?php
 header("content-type:application/json;charset=utf-8");
 @$pageNo = $_REQUEST['pageNo'];
 require("init.php");
 if($pageNo===NULL){
    $pageNo = 1;
 }
 $offset = ($pageNo-1)*5;
 $sql = "SELECT * FROM t_product limit $offset,5";
 $result = mysqli_query($conn,$sql);
 $rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
 $str = json_encode($rows);
 echo $str;
?>