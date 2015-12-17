<?php
namespace Home\Controller;
use Think\Controller;
use Home\Controller\CommonController;
class LoginController extends Controller {
    
    public function index(){
        if(!IS_POST){
    	   $this->display('login');
        }else{
            $content['username'] =  I("username");
            $content['_logic'] = 'and';
            $content['password'] =  I("password","","md5");
            $user = D("Common/user");
            
            // dump($admin->where($content)->find());
            $result = $user->where($content)->find();
//             var_dump( $result);
            if ($result) {
                CommonController::updateSession($result['id']);
                $this->success('登陆成功',U('Index/index'));
            }else{
                $this->error($user->getError(),'Login/index',1);
            }
        }
    }
    
    public function logout(){
        
        session(null);
        
        $this->success("退出成功！","index",1);
    }
    
    public function register(){
        if(!IS_POST){
            $this->display();
        }else{
            $user = $this->getModel();
            $data = $user->create($_POST);
            if($data){
                $data['create_time'] = time();
                $res=$user->add($data);
                if($res){
                    $userinfo = M("userinfo");
                    $infoData['faceImg'] = "/zone/Public/home/upload/faceImg/defaultFaceImg.png";
                    $infoData['user_id'] = $res;
                    $userinfo->add($infoData);
                    $this->success("注册成功","index",1);
                }else{
                    $this->error('注册失败，错误信息：'.$user->getError(),"add",2);
                }
            }else{
                $this->error($user->getError(),"index",2);
            }
        }
    }
    
    public function getResGetVerify(){
       $Verify = new \Think\Verify();
       $Verify->fontSize = 30;
       $Verify->length   = 4;
       $Verify->useNoise = false;
       $Verify->entry();
    }
    
    function check_verify(){
        $verify = new \Think\Verify();
       $this->ajaxReturn( $verify->check(I('code')));
    }
    
    function findByName(){
        $user = M("user");
        $res = $user->where("username=".I("username"))->select();
        $data = array();
        if($res){
            $data['message']= "该用户名已有人使用，请重新选择！";
            $data['status'] = "error";
        }else{
            $data['message']= "用户名可用！";
            $data['status'] = "success";
        }
        $this->ajaxReturn($data);
    }
    
    private function getModel(){
        return D("Common/User");
    }
}