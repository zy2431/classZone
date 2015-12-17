<?php
namespace Home\Controller;
use Think\Controller;
class ClassInfoController extends CommonController {
    public function save(){
        $classInfo = D('Common/classinfo');
        $class = $this::getCurrentClass();//获取当前班级信息
//         dump($class);exit;
        $classInfo->class_id = $class['id'];
        $classInfo->introduce = I("introduce");
        $res = $classInfo->update($class,$classInfo);
       
        if($res){
            $user = $this::getCurrentUser();
            $this::updateSession($user['id']);//更新session中user的信息
            $this->ajaxReturn(true);   	   
        }else{
            $this->error("修改失败","classIntEdit",1);
        }
    }
    
    public function classIntEdit(){
        $this->display('index/classIntEdit');
    }
}