<?php
namespace Admin\Controller;
use Think\Controller;
class TestController extends CommonController {

  public function index(){
//     $Model = D('Common/academy');
//     $Model = D('Common/class');
//     $Model = D('Common/class');
//     $data['classname'] = "12345612";
//     $data['description'] = "1234562";
//     $Model = D('Common/academy');
      $Model = D('Common/Class');
//       $d['username'] = "12112z122";
//       $d['password'] = "1231231";
//       $d['role'] = 1;
//       $d['createTime'] = '';
     $data =  $Model->create($d);
//     $data = $Model->add();
//        if(!$Model->add()){
//          echo "失败";
//      }
     var_dump($Model->relation(true)->find());
     
 }
  
}