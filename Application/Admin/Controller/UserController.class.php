<?php
namespace Admin\Controller;
use Think\Controller;
class UserController extends CommonController {


    public function index(){
        $user = $this->getModel();
        $count      = $user->count();// 查询满足要求的总记录数

        $Page       = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(10)
          // 进行分页数据查询 注意limit方法的参数要使用Page类的属性
    
        $data = $user->relation(TRUE)->limit($Page->firstRow.','.$Page->listRows)->select();

    	//设置显示方式
    	$Page->setConfig('prev', "上一页");//上一页
  		$Page->setConfig('next', '下一页');//下一页
  		$Page->setConfig('first', '首页');//第一页
  		$Page->setConfig('last', "末页");//最后一页
  		$Page -> setConfig ( 'theme', '%HEADER% %FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END%' );
    	$show       = $Page->show();// 分页显示输出

    	$this->assign('data',$data);// 赋值数据集
    	$this->assign('page',$show);// 赋值分页输出
    	$this->display("user/list"); // 输出模板
    }

    public function add(){
        $class = D("Common/Class");
        $class->create();
        $where = array();
        $classData = $class->where($where)->select();
        $this->assign("class",$classData);
    	$this->display();
    }

    public function doadd(){
//     	if(I("password")!=I("repassword")){
//     		$this->error("傻逼 两次密码都输不对","add",1);
//     	}
    	$user = $this->getModel();
    	$data = $user->create($_POST);
    	
    	
//     	var_dump($user->getError());exit;
    	if($data){
    	    $data['create_time'] = time();
        	if($user->add($data)){
        	   $this->success("添加成功","index",1);
        	}else{
        	    $this->error('添加失败，请重试',"add",2);
        	}
    	}else{
    	    $this->error($user->getError(),"add",2);
    	}    
    }

      public function update(){
       //准备学院数据
       $academy = D("Common/Academy");
       $academyData = $academy->relation(TRUE)->select();
       $this->assign("academyJson",json_encode($academyData));
//        var_dump(json_encode($academyData));exit;
          
      //准备班级数据
        $class = D("Common/Class");
        $class->create();
        $where = array();
        $classData = $class->relation(TRUE)->where($where)->select();
        $this->assign("class",$classData);
          
        //准备用户数据
		$user = $this->getModel();
		$userData = $user->relation(TRUE)->find(I("id"));
// 		dump($userData['class']);exit;
		$this->assign('data',$userData);
    	$this->display();
    }

       public function doupdate(){
       	$user = $this->getModel();
       	$data = $user->create();
       	$a = $user->save($data);
		if($a>0){
	    	$this->success("修改成功","index",1);
		}else{
			$this->error($user->getError(),"index",1);
		}       	
    }

      public function delete(){
      	$user = $this->getModel();
      	$res = $user->delete(I('id'));
    	$this->success("删除成功","index",1);
    }
    
    public function info(){
        $user = $this->getModel();
        
        $data = $user->relation(TRUE)->find(I('id'));
        $data['userinfo']['sex'] = $data['userinfo']['sex']==0?"女":"男";
//         var_dump ($data['role']=='0');exit;
        switch ($data['role']){
            case 0:$data['role'] = "学生";break;
            case 1:$data['role'] = "班干部";break;
            case 2:$data['role'] = "班主任";break;
            case 3:$data['role'] = "教师";break;
        }
        
//         $data['role'] = ($data['role']=='0')?"学生":$data['role']==1?"班干部":$data['role']==2?"班主任":"教师";
// var_dump($data['role']);exit;
        
        $this->assign("data",$data);
        $this->display();
    }
    
    private function getModel(){
        return D("Common/User");
    }
}