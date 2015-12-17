<?php
namespace Home\Common\Controller;
use Think\Controller;
use Think\Auth;
Class AuthController extends Controller {
    protected function _initialize(){
        $auth = new Auth();
        if($auth->check()){
           $this->error("对不起，您没有权限","login",2);
        }
    }
    
//     public function __construct(){
//         $parent->__construct;
//     }
}