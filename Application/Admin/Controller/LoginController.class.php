<?php
namespace Admin\Controller;
use Think\Controller;
class LoginController extends Controller {
    public function dologin(){
         $content['adminname'] =  I("adminname");
         $content['_logic'] = 'and';
    	 $content['password'] =  I("password","","md5");
    	 $admin = M("admin");
    	 // dump($admin->where($content)->find());
    	 $result = $admin->where($content)->select();
    	 if ($result) {
    	    	$this->success('登陆成功',U('Index/index'));
    	    }else{
    	    	$this->error();
    	    }   
    }
    public function index(){
    	$this->display('login');
    }
    
}