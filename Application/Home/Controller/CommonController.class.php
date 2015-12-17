<?php
namespace Home\Controller;
use Home\Common\Controller\AuthController;

class CommonController extends AuthController {
    public  function _initialize(){
        if(empty($_SESSION['user'])){
            $this->redirect('login/index');
            exit;
        }else{
            $post = M("post");
            $class = $this->getCurrentClass();
            $leftData = $post->limit(8)->where("class_id=".$class['id'])->order("create_time desc")->select();//设置公告数据
            foreach($leftData as $k=>$v){
                $user = M('user');
                $userdata = $user->find($leftData[$k]['create_user_id']);
                $leftData[$k]['create_user'] = $userdata;
            }
            $this->assign("leftData",$leftData);
            $this->assign("class",session('class'));
            $this->assign("user",session('user'));
        }
        $this->assign("left_title","最新公告");
    }

//设置分页方式 并返回分页的效果
    public function getPageShow($Page){
    	$Page->setConfig('prev', "上一页");//上一页
  		$Page->setConfig('next', '下一页');//下一页
  		$Page->setConfig('first', '首页');//第一页
  		$Page->setConfig('last', "末页");//最后一页
  		$Page -> setConfig ( 'theme', '%HEADER% %FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END%' );
  		return $Page->show();
    }
    //获取当前用户信息
    public function getCurrentUser(){
        return session('user');
    }
    //获取当前班级信息
    public function getCurrentClass(){
        return session('class');
    }
    //更新session数据 用户修改诗句以后的操作 防止数据更新不上来
    public function updateSession($id){
        $user = D('Common/User');
        $class = D('Common/class');
        $userData = $user->relation(TRUE)->find($id);
        $classData = $class->relation(TRUE)->find($userData['class_id']);
        session('user',$userData);
        session('class',$classData);
    }
}
