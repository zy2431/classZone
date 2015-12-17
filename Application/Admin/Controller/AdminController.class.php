<?php
namespace Admin\Controller;
use Think\Controller;
class AdminController extends CommonController {


    public function index(){
    	$admin = M("admin");
    	
      $count      = $admin->count();// 查询满足要求的总记录数

      $Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(10)
      // 进行分页数据查询 注意limit方法的参数要使用Page类的属性

      $data = $admin->limit($Page->firstRow.','.$Page->listRows)->select();

    	 $show = $this::getPageShow($Page);

    	$this->assign('data',$data);// 赋值数据集
    	$this->assign('page',$show);// 赋值分页输出
    	$this->display("admin/list"); // 输出模板
    }

    public function add(){
    	$this->display();
    }

    public function doadd(){
    	if(I("password")!=I("repassword")){
    		$this->error("傻逼 两次密码都输不对","add",1);
    	}
    	$admin = D("admin");
    	$admin->create();
    	if($admin->add()){
    	   $this->success("添加成功","index",1);
    	}else{
    	    $this->error($admin->getError(),"index",1);
    	}
    }

      public function update(){
		$admin = M("admin");
		$data = $admin->find(I("id"));
		// dump($data);exit;
		$this->assign('data',$data);
    	$this->display();
    }

       public function doupdate(){
       	$admin = M("admin");
       	$data['id']= I("id");
        $data['adminname']= I("adminname");
       	$data['password']= I("password",'','md5');
       	$data['description']= I("description");

       	$a = $admin->save($data);
		if($a>0){
	    	$this->success("修改成功","index",1);
		}else{
			$this->error("修改失败","index",1);
		}       	
    }

      public function delete(){
      	$admin = M("admin");
      	$res = $admin->delete(I('id'));
    	$this->success("删除成功","index",1);
    }
    
}