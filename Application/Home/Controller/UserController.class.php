<?php
namespace Home\Controller;

use Think\Controller;

class uSERController extends CommonController
{

    public function index()
    {
        $this->display();
    }

    public function info()
    {
        if ($_GET['id']) {
            $user = D("Common/User");
            $userData = $user->Relation(TRUE)->find(I('id'));
            $this->assign("user", $userData);
            $this->assign("contentTitle", "个人资料");
            $this->display();
        } else {
            $userData = $this->getCurrentUser();
            $this->assign("user", $userData);
            $this->assign("contentTitle", "个人中心");
            $this->display('myInfo');
        }
    }

    public function editInfo()
    {
        $user = $this->getCurrentUser();
        $this->assign("user", $user);
        $this->display();
    }
    
    public function doEditInfo(){
        $userinfo = D("common/userinfo");
        $data = $userinfo->create();
        
        $res = $userinfo->save($data);
        
//         var_dump($data);exit;
        if($res){
            $user = $this->getCurrentUser();
            $this->updateSession($user['id']);
            $this->success("修改成功","info",1);
        }else{
//             $this->display('editinfo');
            $this->error("修改失败，错误信息：".$userinfo->getError(),"info");
        }
    }
}