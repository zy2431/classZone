<?php
namespace Home\Controller;
use Think\Controller;
class PostController extends CommonController {
    public function index(){
        
        $post = M("post");
        $class = $this->getCurrentClass();
        $count      = $post->where("class_id=".$class['id'])->count();// 查询满足要求的总记录数
        $Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(10)
        // 进行分页数据查询 注意limit方法的参数要使用Page类的属性
        
        $data = $post->limit($Page->firstRow.','.$Page->listRows)->where("class_id=".$class['id'])->select();
        foreach($data as $k=>$v){
            $user = M('user');
            $userdata = $user->find($data[$k]['create_user_id']);
            $data[$k]['create_user'] = $userdata;
        }
        $show = $this::getPageShow($Page);
        
        $this->assign('data',$data);// 赋值数据集
        $this->assign('page',$show);// 赋值分页输出
    	$this->display();
    }
    
    public function add(){
        
        if(IS_POST){
            $user = $this->getCurrentUser();
            $class = $this->getCurrentClass();
            $post  = M("post");
            $data = $post->create();
            $data['create_time'] = time();
            $data['create_user_id'] = $user['id'];
            $data['class_id'] = $class['id'];
            
            $res = $post->add($data);
            if($res){
                $this->ajaxReturn(true);
            }else{
                $this->ajaxReturn(false);
                
            }
        }else{
            $this->display();
        }
    }
    
    public function info(){
        $post = M('post');
        $postData = $post->find(I('id')); 
        
        $user = M('user');
        $userdata = $user->find($postData['create_user_id']);
        $postData['create_user'] = $userdata;
        
        $this->assign("data",$postData);
        $this->display();
    }
}